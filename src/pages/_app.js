import '@/styles/globals.css'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
