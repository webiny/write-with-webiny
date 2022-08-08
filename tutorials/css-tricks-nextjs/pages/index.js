import Head from 'next/head'
import Home from './components/home'
import Header from './components/header'

export default function App() {
  return (
    <div>
      <Head>
        <title>CSS tricks clone</title>
        <meta name="description" content="Built with Webiny headless CMS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Home />
    </div>
  )
}
