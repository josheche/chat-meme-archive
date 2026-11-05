export const metadata = { title: 'About the archive' }
export default function AboutPage() {
  return (
    <main id="main" className="shell interior-page">
      <h1>The archive</h1>
      <div className="story-prose">
        <p>A growing collection of memes.</p>
        <p>
          Names and context appear only with the memes. The collection includes AI-generated parody
          and image memes.
        </p>
        <p>
          Dates are labeled by what is known: creation, delivery, upload or observation. An observed
          date is not a creation date. First use in the group is unknown unless noted.
        </p>
        <p>
          More images are still being catalogued. Names identify only people depicted or referenced
          in each image; they do not establish who created or shared it.
        </p>
      </div>
    </main>
  )
}
