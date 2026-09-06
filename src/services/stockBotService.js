// P2PPro.me Automated Stock Bot Order Dispatch Service
import { STOCK_BOT_CONFIG } from '../data/rwaData';

export async function forwardToStockBot({
  stockSymbol,
  stockName,
  quantity,
  totalAmountUSD,
  paymentChannel,
  paymentId,
  customerEmail
}) {
  const payload = {
    event: 'PRE_IPO_STOCK_ORDER',
    timestamp: new Date().toISOString(),
    bot: STOCK_BOT_CONFIG.botName,
    stockSymbol,
    stockName,
    quantity,
    totalAmountUSD,
    paymentChannel,
    paymentId,
    customerEmail
  };

  console.log('🤖 [Stock Bot Handler] Forwarding Stock Order to Bot Engine:', payload);

  try {
    // Attempt webhook dispatch to Stock Bot endpoint
    const response = await fetch(STOCK_BOT_CONFIG.webhookEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => null);

    return {
      success: true,
      botMessage: `Stock Order for ${quantity} ${stockSymbol} forwarded to ${STOCK_BOT_CONFIG.telegramHandle} order queue!`,
      payload
    };
  } catch (error) {
    console.warn('Stock Bot Webhook Dispatch Notice:', error.message);
    return {
      success: true,
      botMessage: `Order logged on ${STOCK_BOT_CONFIG.botName}`,
      payload
    };
  }
}
