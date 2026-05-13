import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

type Category =
  | 'All'
  | 'On the water'
  | 'Food & drinks'
  | 'Local history'
  | 'Nature & trails'
  | 'Family-friendly'
  | 'Rainy day'
  | 'Something easy'
  | 'Events'

type Recommendation = {
  name: string
  category: Exclude<Category, 'All'>
  description: string
  bestFor: string
  timeNeeded: string
  area: string
  verificationStatus: 'Needs verification' | 'Verified'
  phone?: string
  website?: string
  directions?: string
  confirmationNote: string
}

const categories: Category[] = [
  'All',
  'On the water',
  'Food & drinks',
  'Local history',
  'Nature & trails',
  'Family-friendly',
  'Rainy day',
  'Something easy',
  'Events',
]

const recommendations: Recommendation[] = [
  {
    name: 'Sheltered Cove Paddle',
    category: 'On the water',
    description:
      'A low-key water outing idea for calm conditions, good views, and a short first stop near the harbour.',
    bestFor: 'Couples, friends, and confident beginners',
    timeNeeded: '1.5-2.5 hours',
    area: 'Harbour or nearby sheltered shoreline',
    verificationStatus: 'Needs verification',
    confirmationNote:
      'Confirm weather, water conditions, gear, operator availability, and safety requirements before going.',
  },
  {
    name: 'Casual Local Bite',
    category: 'Food & drinks',
    description:
      'A simple meal stop for visitors who want something relaxed before heading back out for the afternoon.',
    bestFor: 'Lunch, early dinner, and groups with mixed tastes',
    timeNeeded: '45-75 minutes',
    area: 'Village core or main road',
    verificationStatus: 'Needs verification',
    confirmationNote:
      'Confirm hours, menu, accessibility, reservations, and seasonal service directly with the operator.',
  },
  {
    name: 'Canal & Village Story Stop',
    category: 'Local history',
    description:
      'A short history-focused visit built around the canal, working waterfront, and local village context.',
    bestFor: 'Curious visitors, photographers, and slower travel days',
    timeNeeded: '30-60 minutes',
    area: 'Canal area and village waterfront',
    verificationStatus: 'Needs verification',
    confirmationNote:
      'Confirm site access, opening hours, fees, guided options, and any current advisories before visiting.',
  },
  {
    name: 'Quiet Trail Stretch',
    category: 'Nature & trails',
    description:
      'A fresh-air walk idea with enough nature to reset the day without requiring a full hiking plan.',
    bestFor: 'Walkers, birdwatchers, and visitors with an open hour',
    timeNeeded: '45-90 minutes',
    area: 'Nearby trail, park, or shoreline path',
    verificationStatus: 'Needs verification',
    confirmationNote:
      'Confirm trail conditions, parking, washrooms, pet rules, and weather before heading out.',
  },
  {
    name: 'Easy Family Loop',
    category: 'Family-friendly',
    description:
      'A gentle outing plan with short travel time, room to move around, and flexible pacing for kids.',
    bestFor: 'Families with young children or multi-generation groups',
    timeNeeded: '60-120 minutes',
    area: 'Village, waterfront, or nearby open space',
    verificationStatus: 'Needs verification',
    confirmationNote:
      'Confirm age suitability, washrooms, stroller access, food options, and current operating details.',
  },
  {
    name: 'Rainy-Day Browse',
    category: 'Rainy day',
    description:
      'A weather-friendly stop for browsing, learning, or taking a dry break when outdoor plans get soggy.',
    bestFor: 'Rain delays, relaxed mornings, and visitors without gear',
    timeNeeded: '30-75 minutes',
    area: 'Indoor stop in or near the village',
    verificationStatus: 'Needs verification',
    confirmationNote:
      'Confirm hours, admission, accessibility, and seasonal availability before making the trip.',
  },
  {
    name: 'Five-Minute Scenic Reset',
    category: 'Something easy',
    description:
      'A quick, low-commitment stop for a view, a stretch, and a simple answer when nobody wants a big plan.',
    bestFor: 'Road-trippers, marina guests, and late-afternoon gaps',
    timeNeeded: '10-25 minutes',
    area: 'Lookoff, wharf, or waterfront pull-in',
    verificationStatus: 'Needs verification',
    confirmationNote:
      'Confirm parking, public access, daylight, road conditions, and any posted restrictions on arrival.',
  },
  {
    name: 'Today or This-Week Event Check',
    category: 'Events',
    description:
      'A manual event prompt for visitors to check what might be happening nearby before choosing a plan.',
    bestFor: 'Evenings, weekends, and visitors who like local happenings',
    timeNeeded: 'Varies by event',
    area: 'St. Peter\'s and surrounding communities',
    verificationStatus: 'Needs verification',
    confirmationNote:
      'Confirm date, time, location, tickets, capacity, cancellation notices, and organizer details.',
  },
]

function AskStPetersPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [emailCopied, setEmailCopied] = useState(false)
  const [source] = useState(() => {
    const value = new URLSearchParams(window.location.search).get('source')
    return value?.trim() || 'direct'
  })
  const [showSourceDebug] = useState(() => {
    return new URLSearchParams(window.location.search).get('debug') === 'true'
  })

  const copyPilotEmail = async () => {
    if (!navigator.clipboard) {
      return
    }

    try {
      await navigator.clipboard.writeText('lucasliamlegacystudios@gmail.com')
      setEmailCopied(true)
    } catch {
      setEmailCopied(false)
    }
  }

  const filteredRecommendations = useMemo(() => {
    if (selectedCategory === 'All') {
      return recommendations
    }

    return recommendations.filter(
      (recommendation) => recommendation.category === selectedCategory,
    )
  }, [selectedCategory])

  return (
    <main className="ask-page">
      <section className="ask-hero" aria-labelledby="ask-title">
        {showSourceDebug && <div className="ask-source">Source: {source}</div>}
        <p className="ask-kicker">Visitor concierge pilot</p>
        <h1 id="ask-title">Ask St. Peter&apos;s</h1>
        <p className="ask-subtitle">
          Find what to do nearby today &mdash; water, food, trails, history,
          family stops, and rainy-day ideas.
        </p>
        <p className="ask-disclaimer">
          Always confirm hours, availability, pricing, safety, and booking
          details directly with each operator.
        </p>
      </section>

      <section className="ask-section" aria-labelledby="category-title">
        <div className="ask-section-heading">
          <h2 id="category-title">What sounds right?</h2>
          <p>{filteredRecommendations.length} manual ideas</p>
        </div>
        <div className="category-filters" aria-label="Recommendation filters">
          {categories.map((category) => (
            <button
              className={category === selectedCategory ? 'active' : ''}
              key={category}
              onClick={() => setSelectedCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="recommendation-list" aria-label="Recommendations">
        {filteredRecommendations.map((recommendation) => (
          <article className="recommendation-card" key={recommendation.name}>
            <div className="recommendation-topline">
              <span>{recommendation.category}</span>
              <strong>{recommendation.verificationStatus}</strong>
            </div>
            <h2>{recommendation.name}</h2>
            <p className="recommendation-description">
              {recommendation.description}
            </p>
            <dl className="recommendation-details">
              <div>
                <dt>Best for</dt>
                <dd>{recommendation.bestFor}</dd>
              </div>
              <div>
                <dt>Time needed</dt>
                <dd>{recommendation.timeNeeded}</dd>
              </div>
              <div>
                <dt>Area</dt>
                <dd>{recommendation.area}</dd>
              </div>
            </dl>
            <div className="recommendation-actions">
              {recommendation.verificationStatus === 'Verified' ? (
                <>
                  {recommendation.phone && (
                    <a href={`tel:${recommendation.phone}`}>Call</a>
                  )}
                  {recommendation.website && (
                    <a
                      href={recommendation.website}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Website / Book Direct
                    </a>
                  )}
                  {recommendation.directions && (
                    <a
                      href={recommendation.directions}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Directions
                    </a>
                  )}
                </>
              ) : (
                <>
                  <button disabled type="button">
                    Call pending
                  </button>
                  <button disabled type="button">
                    Link pending
                  </button>
                  <button disabled type="button">
                    Directions pending
                  </button>
                </>
              )}
            </div>
            <p className="placeholder-note">
              This recommendation is a placeholder until the operator/location
              is verified.
            </p>
            <p className="confirmation-note">
              {recommendation.confirmationNote}
            </p>
          </article>
        ))}
      </section>

      <section className="pilot-callout" aria-labelledby="pilot-title">
        <div className="pilot-copy">
          <h2 id="pilot-title">Founding pilot</h2>
          <p>
            Are you a local operator or host location? Ask St. Peter&apos;s is
            opening a small founding pilot for verified recommendations and QR
            host locations.
          </p>
          <p className="pilot-email">
            <span>Email Lucas directly:</span>
            <strong>lucasliamlegacystudios@gmail.com</strong>
          </p>
        </div>
        <div className="pilot-actions">
          <button type="button" onClick={copyPilotEmail}>
            {emailCopied ? 'Email copied' : 'Copy email address'}
          </button>
        </div>
      </section>
    </main>
  )
}

function StarterPage() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((currentCount) => currentCount + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

function App() {
  if (window.location.pathname === '/ask-st-peters') {
    return <AskStPetersPage />
  }

  return <StarterPage />
}

export default App
