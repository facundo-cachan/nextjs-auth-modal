import { NextPage } from 'next'
import type { Page } from 'config/interfaces'

const Index: NextPage<Page> = (props: any) => {
  console.log(props);
  return (
    <section>
      Index Page
    </section>
  )
}

// This function gets called at build time
export async function getServerSideProps() {
  return { props: {} }
}

export default Index
