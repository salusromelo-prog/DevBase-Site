/* Ilustração abstrata de navegador — wireframe, sem conteúdo real */
export default function BizArt({ className = '' }: { className?: string }) {
  return (
    <div className={`biz-art${className ? ` ${className}` : ''}`} aria-hidden="true">
      <div className="biz-art__bar"><i /><i /><i /></div>
      <div className="biz-art__body">
        <div className="biz-art__nav">
          <span className="sq" />
          <span className="biz-line" style={{ width: 56 }} />
          <span className="biz-line" style={{ width: 36, marginLeft: 'auto' }} />
          <span className="biz-line" style={{ width: 36 }} />
          <span className="biz-line ac" style={{ width: 48 }} />
        </div>
        <div className="biz-art__hero">
          <span className="biz-line lg" style={{ width: '74%' }} />
          <span className="biz-line lg" style={{ width: '52%' }} />
          <span className="biz-line" style={{ width: '64%' }} />
          <span className="biz-art__btn" />
        </div>
        <div className="biz-art__cards">
          {[0, 1, 2].map(i => (
            <div key={i} className="biz-art__card">
              <span className="dot" />
              <span className="biz-line" style={{ width: '82%' }} />
              <span className="biz-line" style={{ width: '56%' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
