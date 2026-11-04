import Link from 'next/link'
import { people, memes } from '@/data/archive'
export const metadata = { title: 'The people' }
export default function PeoplePage() {
  return (
    <main id="main" className="shell interior-page">
      <p className="eyebrow">THE PEOPLE & THE CREDITS</p>
      <h1>
        A cast.
        <br />
        <em>Not a quiet one.</em>
      </h1>
      <p className="page-intro">
        Who is in the joke, who is mentioned, and who made the image. Those are different things.
      </p>
      <div className="people-grid">
        {people.map((person) => {
          const appearances = memes.filter((m) =>
            [...m.depicted, ...m.referenced, m.creator, m.requester].includes(person.slug),
          ).length
          return (
            <Link className="person-card" key={person.slug} href={`/people/${person.slug}/`}>
              <span className="person-avatar">{person.initials}</span>
              <span className="eyebrow">{person.role}</span>
              <h2>{person.name}</h2>
              <p>{person.description}</p>
              <span className="person-card-footer">
                {appearances} linked memes <span>↗</span>
              </span>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
