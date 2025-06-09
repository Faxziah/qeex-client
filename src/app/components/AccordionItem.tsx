"use client"

import { useRef, useEffect } from "react"
import "../styles/accordion.css"

interface AccordionItemProps {
  question: string
  answer: string
  isActive: boolean
  onClick: () => void
}

const AccordionItem = ({ question, answer, isActive, onClick }: AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isActive ? `${contentRef.current.scrollHeight}px` : "0px"
    }
  }, [isActive])

  return (
    <div className={`accordion-item ${isActive ? "active" : ""}`}>
      <button className="accordion-header" onClick={onClick} aria-expanded={isActive}>
        <span className="accordion-title">{question}</span>
        <span className="accordion-icon">{isActive ? "−" : "+"}</span>
      </button>
      <div ref={contentRef} className="accordion-content">
        <div className="accordion-body">{answer}</div>
      </div>
    </div>
  )
}

export default AccordionItem