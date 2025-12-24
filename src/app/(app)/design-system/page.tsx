"use server"
import { Button } from "@/components/Button"
import { Search } from "@/components/Search"

export default async function DesignSystemPage() {
  return (
    <div data-app="frontend" className="fe-page fe-stack-3" style={{ paddingTop: "var(--space-20)", paddingBottom: "var(--space-20)" }}>
      <section className="fe-stack-1">
        <h1 className="pobut_H1">Упаковочні матеріали h1</h1>
        <p className="pobut_body">Typography, spacing, surfaces, buttons, inputs, nav, cards.</p>
        <a className="fe-link pobut_body" href="#">Link example</a>
      </section>

      <section className="fe-stack-2">
        <h2 className="pobut_H2">Typography h2</h2>
        <div className="fe-card fe-stack-1" style={{ padding: "var(--space-20)" }}>
          <div className="pobut_H1">H1 — Unbounded Bold</div>
          <div className="pobut_H2">H2 — Unbounded Regular</div>
          <div className="pobut_H3">H3 — Unbounded Bold</div>
          <div className="pobut_body">Body — Unbounded Regular</div>
          <div className="pobut_caption">Caption — Unbounded Regular</div>
        </div>
      </section>

      <section className="fe-stack-2">
        <h2 className="pobut_H2">Buttons</h2>
        <div className="flex flex-wrap fe-gap-2">
          <Button variant="outline">Додати в кошик</Button>
          <Button variant="primary">Додати в кошик</Button>
          <Button variant="outline">Більше ˅</Button>
        </div>
      </section>

      <section className="fe-stack-2">
        <h2 className="pobut_H2">Search Input</h2>
        <div className="fe-search" style={{ maxWidth: "42rem" }}>
          <Search/>
        </div>
      </section>

      <section className="fe-stack-2">
        <h2 className="pobut_H2">Product card</h2>
        <div className="fe-product" style={{ maxWidth: "22rem" }}>
          <div style={{ height: "10rem", background: "var(--sys-surface-2)" }} />
          <div className="fe-product__body fe-stack-1">
            <div className="pobut_caption fe-availability">● в наявності</div>
            <div className="pobut_body">Паперові стакани 250 мл / 50 шт</div>
            <div className="pobut_H3 fe-price">265 грн</div>
            <Button variant="outline">Додати в кошик</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
