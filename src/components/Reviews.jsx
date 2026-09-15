import { useMemo, useState } from 'react'
import {
  MessageSquareQuote,
  PenLine,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  X
} from 'lucide-react'

const reviewCards = [
  {
    title: 'Professional recommendation',
    role: 'Manager / Team Lead',
    text: 'Approved recommendations can appear here with clear role, organization and relationship context.'
  },
  {
    title: 'Client feedback',
    role: 'Client / Collaborator',
    text: 'Client feedback is reviewed privately first, then published only with permission.'
  },
  {
    title: 'Teaching feedback',
    role: 'Student / Mentee',
    text: 'Authentic mentoring feedback can highlight clarity, patience and practical teaching impact.'
  },
  {
    title: 'Peer feedback',
    role: 'Colleague / Faculty',
    text: 'Professional peers can share feedback about collaboration, ownership and communication.'
  }
]

function ReviewCard({ review, index }) {
  return (
    <article className="moving-review-card">
      <div className="review-card-topline">
        <span className="review-avatar">{String(index + 1).padStart(2, '0')}</span>
        <div className="review-stars" aria-label="5 star review placeholder">
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <Star key={starIndex} size={14} />
          ))}
        </div>
      </div>

      <blockquote>{review.text}</blockquote>

      <footer>
        <strong>{review.title}</strong>
        <span>{review.role}</span>
      </footer>
    </article>
  )
}

export default function Reviews() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState({ status: 'idle', message: '' })
  const [startedAt] = useState(() => Date.now())

  const movingRows = useMemo(
    () => [
      [...reviewCards, ...reviewCards],
      [...reviewCards.slice().reverse(), ...reviewCards.slice().reverse()]
    ],
    []
  )

  const submit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget

    setState({ status: 'loading', message: 'Sending your review…' })

    try {
      const data = Object.fromEntries(new FormData(form))
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          startedAt: Number(data.startedAt)
        })
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        throw new Error(payload.message || 'Could not send your review.')
      }

      form.reset()
      setState({
        status: 'success',
        message: 'Thank you — your review was emailed privately for approval.'
      })
    } catch (error) {
      setState({
        status: 'error',
        message:
          error.message || 'Email delivery requires Gmail / Vercel configuration.'
      })
    }
  }

  return (
    <section id="reviews" className="section reviews-section">
      <div className="shell">
        <div className="reviews-header reveal">
          <div>
            <span className="section-kicker">TESTIMONIALS</span>
            <h2>
              Real feedback, <em>always in motion.</em>
            </h2>
            <p>
              Recommendations are moderated before publication, then presented in a
              continuously moving showcase that stays readable and polished.
            </p>
          </div>

          <button className="button button-primary" onClick={() => setOpen(true)}>
            <PenLine size={17} />
            Leave a Review
          </button>
        </div>

        <div className="reviews-showcase reveal">
          <div className="review-trust-panel">
            <div className="review-trust-icon">
              <MessageSquareQuote size={28} />
            </div>

            <div>
              <span>AUTHENTIC FEEDBACK ONLY</span>
              <h3>Trust should be visible — and earned.</h3>
              <p>
                Submitted reviews are sent privately to email first. Nothing is
                automatically published, which keeps the portfolio credible for
                recruiters, clients and collaborators.
              </p>
            </div>

            <div className="review-trust-badges">
              <span>
                <ShieldCheck size={16} /> Moderated before publishing
              </span>
              <span>
                <Sparkles size={16} /> Smooth infinite motion
              </span>
            </div>
          </div>

          <div className="reviews-marquee" aria-label="Animated review showcase">
            {movingRows.map((row, rowIndex) => (
              <div
                className={`reviews-track reviews-track-${rowIndex + 1}`}
                key={rowIndex}
              >
                {row.map((review, index) => (
                  <ReviewCard
                    key={`${rowIndex}-${index}-${review.title}`}
                    review={review}
                    index={index % reviewCards.length}
                  />
                ))}
              </div>
            ))}

            <div className="reviews-fade reviews-fade-left" />
            <div className="reviews-fade reviews-fade-right" />
          </div>
        </div>
      </div>

      {open && (
        <div
          className="review-modal"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false)
          }}
        >
          <form className="review-form modal-form" onSubmit={submit}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setOpen(false)}
              aria-label="Close review form"
            >
              <X />
            </button>

            <span className="section-kicker">PROFESSIONAL REVIEW</span>
            <h3>Share your experience</h3>
            <p>
              Your feedback is sent privately to Anayat for moderation before it can
              appear on the public portfolio.
            </p>

            <input type="hidden" name="startedAt" value={startedAt} />
            <input
              className="trap"
              name="website"
              tabIndex="-1"
              autoComplete="off"
            />

            <div className="field-row">
              <label>
                Name
                <input name="name" required placeholder="Your name" />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@email.com"
                />
              </label>
            </div>

            <div className="field-row">
              <label>
                Role
                <input name="role" placeholder="e.g. Team Lead" />
              </label>

              <label>
                Company / organization
                <input name="company" placeholder="Company or university" />
              </label>
            </div>

            <div className="field-row">
              <label>
                Relationship
                <select name="relationship" required defaultValue="Colleague">
                  <option>Manager</option>
                  <option>Team Lead</option>
                  <option>Colleague</option>
                  <option>Client</option>
                  <option>Student / Mentee</option>
                  <option>Faculty / Academic</option>
                </select>
              </label>

              <label>
                Rating
                <select name="rating" defaultValue="5">
                  <option value="5">5 — Excellent</option>
                  <option value="4">4 — Very good</option>
                  <option value="3">3 — Good</option>
                </select>
              </label>
            </div>

            <label>
              Your review
              <textarea
                name="review"
                rows="6"
                required
                minLength="30"
                placeholder="Share specific feedback about working or learning with Anayat…"
              />
            </label>

            <button
              className="button button-primary"
              disabled={state.status === 'loading'}
            >
              Submit review
              <Send size={16} />
            </button>

            {state.message && (
              <p className={`form-status ${state.status}`}>{state.message}</p>
            )}
          </form>
        </div>
      )}
    </section>
  )
}
