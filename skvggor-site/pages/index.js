import Head from 'next/head'

import FeaturedName from '../components/FeaturedName'
import Social from '../components/Social'
import Link from '../components/Link'
import GitHub from '../components/GitHub'
import LastFm from '../components/LastFm'

import styles from '../styles/Home.module.sass'

export const getStaticProps = async () => {
  const lastFmResponse = await fetch('https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=skvggor&format=json&api_key=df8ee1a832c074bd87168b37d8946004')
  const lastFmData = await lastFmResponse.json()

  const githubResponse = await fetch('https://api.github.com/users/marcker/events/public')
  const githubData = await githubResponse.json()


  return {
    props: {
      lastFmData,
      githubData
    },
    revalidate: 1
  }
}

export default function Home({ lastFmData, githubData }) {
  const content = {
    name: 'skvggor',
    description: [
      {
        id: 0,
        text: 'I\'m a developer currently working with '
      },
      {
        id: 1,
        text: <Link type="vue" link="https://vuejs.org/" text="Vue" />
      },
      {
        id: 2,
        text: ' and '
      },
      {
        id: 3,
        text: <Link type="react" link="https://reactjs.org/" text="React" />
      },
      {
        id: 4,
        text: ' at '
      },
      {
        id: 5,
        text: <Link type="match" link="https://www.match.mt/" text="Match" />
      },
      {
        id: 6,
        text: '.'
      }
    ],
    social: [
      {
        id: 0,
        icon: 'source-code',
        link: 'https://github.com/marcker/skvggor.dev/tree/master/skvggor-site'
      },
      {
        id: 1,
        icon: 'github',
        link: 'https://github.com/marcker'
      },
      {
        id: 2,
        icon: 'twitter',
        link: 'https://twitter.com/marcker'
      },
      {
        id: 4,
        icon: 'instagram',
        link: 'https://instagram.com/skvggor'
      },
      {
        id: 5,
        icon: 'last-fm',
        link: 'https://last.fm/user/skvggor'
      }
    ],
    lastfm: { lastFmData },
    github: { githubData }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>/home/skvggor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <GitHub data={content.github} /> */}
        <div className={styles.content}>
          <FeaturedName
            name={content.name}
            description={content.description}
          />
          <Social items={content.social} />
        </div>
        <LastFm data={content.lastfm} />
      </main>
    </div>
  )
}
