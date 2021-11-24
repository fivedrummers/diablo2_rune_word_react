export function getCorsHeaders () {
  const corsHeaders = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
  })
  return corsHeaders
}
