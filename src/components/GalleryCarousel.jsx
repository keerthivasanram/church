import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Magnetic from './motion/Magnetic'
import Arrow from './Arrow'
import './GalleryCarousel.css'

function GalleryCarousel({ images }) {
  const [rotation, setRotation] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const reduce = useReducedMotion()
  const displayImages = images.slice(0, 6)
  const count = displayImages.length
  const angleStep = 360 / count
  const radius = 340 // 3D cylinder radius in pixels

  const dragStartX = useRef(0)

  function rotateTo(index) {
    let targetIdx = index % count
    if (targetIdx < 0) targetIdx += count
    setActiveIndex(targetIdx)
    setRotation(-targetIdx * angleStep)
  }

  function handleNext() {
    rotateTo(activeIndex + 1)
  }

  function handlePrev() {
    rotateTo(activeIndex - 1)
  }

  function handleDragStart(e, info) {
    dragStartX.current = info.point.x
  }

  function handleDragEnd(e, info) {
    const diff = info.point.x - dragStartX.current
    if (diff < -40) {
      handleNext()
    } else if (diff > 40) {
      handlePrev()
    }
  }

  if (reduce) {
    return (
      <div className="g-carousel g-carousel--static">
        <div className="g-carousel__grid">
          {displayImages.map((img) => (
            <div key={img.id} className="g-carousel__card arch">
              <img src={img.thumb} alt={`Gallery photograph ${img.id}`} />
            </div>
          ))}
        </div>
        <div className="g-carousel__footer">
          <Link to="/gallery" className="btn btn-ghost">
            View Full Gallery <Arrow />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="g-carousel">
      <div className="g-carousel__stage">
        {/* 3D Rotational Cylinder */}
        <motion.div
          className="g-carousel__cylinder"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          animate={{ rotateY: rotation }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {displayImages.map((img, i) => {
            const cardAngle = i * angleStep
            const isActive = i === activeIndex

            return (
              <motion.div
                key={img.id}
                className={`g-carousel__card ${isActive ? 'is-active' : ''}`}
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => rotateTo(i)}
              >
                <div className="g-carousel__frame arch">
                  <img
                    src={img.thumb}
                    alt={`Meeting encounter ${img.id}`}
                    className="g-carousel__img"
                  />
                  <div className="g-carousel__glare" aria-hidden="true" />
                  
                  <div className="g-carousel__overlay">
                    <span className="g-carousel__badge">Chapter VI</span>
                    <h3 className="g-carousel__title">Encounter #{img.id}</h3>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Carousel Navigation Controls & Counter */}
      <div className="g-carousel__controls">
        <button
          type="button"
          className="g-carousel__btn g-carousel__btn--prev"
          onClick={handlePrev}
          aria-label="Rotate left"
        >
          ‹
        </button>

        <div className="g-carousel__rail">
          <span className="g-carousel__counter">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <div className="g-carousel__track">
            <motion.div
              className="g-carousel__bar"
              animate={{
                width: `${((activeIndex + 1) / count) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <span className="g-carousel__total">
            {String(count).padStart(2, '0')}
          </span>
        </div>

        <button
          type="button"
          className="g-carousel__btn g-carousel__btn--next"
          onClick={handleNext}
          aria-label="Rotate right"
        >
          ›
        </button>
      </div>

      <div className="g-carousel__footer">
        <Magnetic>
          <Link to="/gallery" className="btn btn-ghost">
            View Full Gallery <Arrow />
          </Link>
        </Magnetic>
      </div>
    </div>
  )
}

export default GalleryCarousel
