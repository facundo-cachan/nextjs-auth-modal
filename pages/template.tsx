import { useState } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import type { Page } from 'config/interfaces'

const UniversalPortal: any = dynamic(() => import('@jesstelford/react-portal-universal').then(({ UniversalPortal }: any) => UniversalPortal));

const Index: NextPage<Page> = (props: any) => {
  console.log(props);

  const [isOpen, toggle] = useState<boolean>(false);

  return (
    <section>
      <button onClick={() => toggle(!isOpen)} type="button">
        Open Modal
      </button>
      {isOpen && (
        <UniversalPortal selector="#modal">
          <div
            style={{
              position: 'fixed',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                position: 'absolute',
                top: '10%',
                right: '10%',
                bottom: '10%',
                left: '10%',
                padding: '1em',
              }}
            >
              <p>
                This modal is rendered using{' '}
                <a href="https://www.npmjs.com/package/@jesstelford/react-portal-universal">
                  <code>@jesstelford/react-portal-universal</code>
                </a>
                .
              </p>
              <button type="button" onClick={() => toggle(!isOpen)}>
                Close Modal
              </button>
            </div>
          </div>
        </UniversalPortal>
      )}
    </section>
  )
}

// This function gets called at build time
export async function getServerSideProps() {

  return { props: {} }
}

export default Index
