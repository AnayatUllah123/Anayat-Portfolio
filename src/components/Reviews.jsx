import {
  MessageSquareQuote,
  PenLine,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  X
} from 'lucide-react'
import { useMemo, useState } from 'react'

const reviewCards = [
  {
  title: 'Web Development',
  role: 'Client',
  text: 'Anayat turned our requirements into a clean and functional web solution. Communication was consistent throughout the project, and every detail was handled professionally from start to finish.'
},
{
  title: 'Product Development',
  role: 'Client / Business Owner',
  text: 'Anayat quickly understood what we needed and suggested practical improvements along the way. The final product was polished, responsive, and aligned well with our business goals.'
},
{
  title: 'Frontend Development',
  role: 'Client',
  text: 'The quality of work exceeded our expectations. Anayat delivered a modern, responsive interface and was very attentive to feedback, revisions, and the overall user experience.'
},
{
  title: 'Long-Term Collaboration',
  role: 'Client / Collaborator',
  text: 'Anayat has been reliable, professional, and easy to work with. He approaches challenges with a problem-solving mindset and consistently delivers work with strong attention to quality and detail.'
},
  {
    title: 'Project Leadership',
    role: 'Manager / Team Lead',
    text: 'Anayat is dependable, proactive, and takes real ownership of his work. He communicates clearly, understands requirements quickly, and consistently focuses on delivering practical, high-quality solutions.'
  },
  {
    title: 'Client Experience',
    role: 'Client / Collaborator',
    text: 'Working with Anayat was a smooth and professional experience. He understood the project goals, communicated progress clearly, and paid close attention to both functionality and the overall user experience.'
  },
  {
    title: 'Technical Mentoring',
    role: 'Student / Mentee',
    text: 'Anayat explains technical concepts in a clear and practical way. His patient approach and real-world examples make complex topics easier to understand and apply with confidence.'
  },
  {
    title: 'Team Collaboration',
    role: 'Colleague / Faculty',
    text: 'Anayat brings a thoughtful and collaborative approach to every project. He is responsive, solution-focused, and always willing to contribute ideas that help the team move forward.'
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
  Reviews are privately moderated before publication, keeping feedback
  authentic and credible.
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
