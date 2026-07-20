/** Blueprint-style corner brackets + optional label, for the premium dark theme. */
function Brackets({ label }) {
  return (
    <div className="brackets" aria-hidden="true">
      <span className="brackets__c brackets__c--tl" />
      <span className="brackets__c brackets__c--tr" />
      <span className="brackets__c brackets__c--bl" />
      <span className="brackets__c brackets__c--br" />
      {label && <span className="brackets__label">{label}</span>}
    </div>
  )
}

export default Brackets
