/** Small right-arrow used inside buttons/links (animates on hover via .btn__arrow). */
function Arrow() {
  return (
    <svg className="btn__arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default Arrow
