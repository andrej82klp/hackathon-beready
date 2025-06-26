import { ref, computed } from 'vue';
import { supabase } from '../lib/supabase';
import { useAuth } from './auth';
import { stripeProducts, getProductByPriceId } from '../stripe-config';
import type { StripeProduct } from '../stripe-config';

interface StripeSubscription {
  customer_id: string;
  subscription_id: string | null;
  subscription_status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

interface StripeOrder {
  order_id: number;
  checkout_session_id: string;
  payment_intent_id: string;
  amount_subtotal: number;
  amount_total: number;
  currency: string;
  payment_status: string;
  order_status: string;
  order_date: string;
}

const subscription = ref<StripeSubscription | null>(null);
const orders = ref<StripeOrder[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

export const useStripe = () => {
  const { user, isAuthenticated } = useAuth();

  const currentPlan = computed(() => {
    if (!subscription.value?.price_id) return null;
    const product = getProductByPriceId(subscription.value.price_id);
    return product?.name || 'Unknown Plan';
  });

  const isSubscriptionActive = computed(() => {
    return subscription.value?.subscription_status === 'active';
  });

  const fetchSubscription = async () => {
    if (!isAuthenticated.value || !user.value) {
      subscription.value = null;
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .maybeSingle();

      if (fetchError) {
        throw fetchError;
      }

      subscription.value = data;
    } catch (err) {
      console.error('Error fetching subscription:', err);
      error.value = err instanceof Error ? err.message : 'Failed to fetch subscription';
    } finally {
      loading.value = false;
    }
  };

  const fetchOrders = async () => {
    if (!isAuthenticated.value || !user.value) {
      orders.value = [];
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await supabase
        .from('stripe_user_orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      orders.value = data || [];
    } catch (err) {
      console.error('Error fetching orders:', err);
      error.value = err instanceof Error ? err.message : 'Failed to fetch orders';
    } finally {
      loading.value = false;
    }
  };

  const createCheckoutSession = async (product: StripeProduct) => {
    if (!isAuthenticated.value || !user.value) {
      throw new Error('User must be authenticated');
    }

    loading.value = true;
    error.value = null;

    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session?.access_token) {
        throw new Error('No access token available');
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.data.session.access_token}`,
        },
        body: JSON.stringify({
          price_id: product.priceId,
          mode: product.mode,
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/donate`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Error creating checkout session:', err);
      error.value = err instanceof Error ? err.message : 'Failed to create checkout session';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    subscription,
    orders,
    loading,
    error,
    currentPlan,
    isSubscriptionActive,
    stripeProducts,
    fetchSubscription,
    fetchOrders,
    createCheckoutSession,
  };
};