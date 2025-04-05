
/**
 * Estimates base metrics based on a domain name
 * Uses realistic values and domain-specific adjustments
 */
export interface BaseMetrics {
  efficiency: number;
  satisfaction: number;
  conversion: number;
  responseTime: number;
}

export const estimateBaseMetrics = (url: string): BaseMetrics => {
  // Normalize URL and extract domain
  const normalizedUrl = url.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
  
  // Base values - realistic, not at 100%
  let efficiency = Math.floor(Math.random() * 15) + 60; // Between 60-75%
  let satisfaction = Math.floor(Math.random() * 20) + 55; // Between 55-75%
  let conversion = Math.floor(Math.random() * 10) + 25; // Between 25-35%
  let responseTime = Math.floor(Math.random() * 25) + 65; // Between 65-90%
  
  // Domain-specific adjustments
  if (normalizedUrl.includes('shop') || normalizedUrl.includes('tienda') || normalizedUrl.includes('store')) {
    conversion += 10; // Stores tend to have better conversion
  }
  
  if (normalizedUrl.endsWith('.com')) {
    efficiency += 5; // .com domains tend to be more established
  }
  
  if (normalizedUrl.length < 10) {
    satisfaction += 5; // Shorter domains tend to be more recognized
  }
  
  if (normalizedUrl.includes('blog') || normalizedUrl.includes('info')) {
    responseTime -= 10; // Content-heavy sites tend to be slower
  }

  return {
    efficiency,
    satisfaction,
    conversion,
    responseTime
  };
};
