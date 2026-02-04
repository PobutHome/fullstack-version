"use client"

import { useDeferredValue, useMemo, useState, useTransition } from "react"

type VariableType = "bg" | "fg" | "both"
type VariableCategory = "all" | "surfaces" | "text" | "states" | "buttons" | "cards" | "chips" | "inputs" | "nav" | "links" | "borders"

interface ColorVariable {
  cssVar: string
  tailwindClass: string
  type: VariableType
  category: VariableCategory[]
  bgClasses?: string
  textClasses?: string
}

const colorVariables: ColorVariable[] = [
  // Surfaces
  { cssVar: "--sys-bg", tailwindClass: "bg-sys-bg", type: "bg", category: ["surfaces"], bgClasses: "bg-sys-bg" },
  { cssVar: "--sys-surface", tailwindClass: "bg-sys-surface", type: "bg", category: ["surfaces"], bgClasses: "bg-sys-surface" },
  { cssVar: "--sys-surface-2", tailwindClass: "bg-sys-surface-2", type: "bg", category: ["surfaces"], bgClasses: "bg-sys-surface-2" },
  { cssVar: "--sys-surface-accent", tailwindClass: "bg-sys-surface-accent", type: "bg", category: ["surfaces"], bgClasses: "bg-sys-surface-accent text-sys-text-on-accent" },
  { cssVar: "--sys-surface-interactive", tailwindClass: "bg-sys-surface-interactive", type: "bg", category: ["surfaces"], bgClasses: "bg-sys-surface-interactive text-sys-text-on-interactive" },
  { cssVar: "--sys-overlay", tailwindClass: "bg-sys-overlay", type: "bg", category: ["surfaces"], bgClasses: "bg-sys-overlay" },
  
  // Accent & Links
  { cssVar: "--sys-accent", tailwindClass: "bg-sys-accent / text-sys-accent", type: "both", category: ["surfaces", "states"], bgClasses: "bg-sys-accent text-sys-text-on-accent", textClasses: "bg-sys-surface text-sys-accent" },
  { cssVar: "--sys-link", tailwindClass: "bg-sys-link / text-sys-link / bg-sys-interactive / text-sys-interactive", type: "both", category: ["links"], bgClasses: "bg-sys-link text-sys-text-on-interactive", textClasses: "bg-sys-surface text-sys-link" },
  
  // Text Variables
  { cssVar: "--sys-text", tailwindClass: "text-sys-text", type: "both", category: ["text"], bgClasses: "bg-sys-surface text-sys-text", textClasses: "bg-sys-surface text-sys-text" },
  { cssVar: "--sys-text-muted", tailwindClass: "text-sys-text-muted", type: "fg", category: ["text"], textClasses: "bg-sys-surface text-sys-text-muted" },
  { cssVar: "--sys-text-subtle", tailwindClass: "text-sys-text-subtle", type: "fg", category: ["text"], textClasses: "bg-sys-surface text-sys-text-subtle" },
  { cssVar: "--sys-text-inverse", tailwindClass: "text-sys-text-inverse", type: "fg", category: ["text"], textClasses: "bg-sys-accent text-sys-text-inverse" },
  { cssVar: "--sys-text-on-accent", tailwindClass: "text-sys-text-on-accent", type: "fg", category: ["text"], textClasses: "bg-sys-accent text-sys-text-on-accent" },
  { cssVar: "--sys-text-on-interactive", tailwindClass: "text-sys-text-on-interactive", type: "fg", category: ["text"], textClasses: "bg-sys-link text-sys-text-on-interactive" },
  { cssVar: "--sys-text-on-surface", tailwindClass: "text-sys-text-on-surface", type: "fg", category: ["text"], textClasses: "bg-sys-surface text-sys-text-on-surface" },
  
  // States - Both bg and text
  { cssVar: "--sys-danger", tailwindClass: "bg-sys-danger / text-sys-danger", type: "both", category: ["states"], bgClasses: "bg-sys-danger text-sys-text-on-danger", textClasses: "bg-sys-surface text-sys-danger" },
  { cssVar: "--sys-text-on-danger", tailwindClass: "text-sys-text-on-danger", type: "fg", category: ["text", "states"], textClasses: "bg-sys-danger text-sys-text-on-danger" },
  { cssVar: "--sys-warning", tailwindClass: "bg-sys-warning / text-sys-warning", type: "both", category: ["states"], bgClasses: "bg-sys-warning text-sys-text-on-warning", textClasses: "bg-sys-surface text-sys-warning" },
  { cssVar: "--sys-text-on-warning", tailwindClass: "text-sys-text-on-warning", type: "fg", category: ["text", "states"], textClasses: "bg-sys-warning text-sys-text-on-warning" },
  { cssVar: "--sys-success", tailwindClass: "bg-sys-success / text-sys-success", type: "both", category: ["states"], bgClasses: "bg-sys-success text-sys-text-on-success", textClasses: "bg-sys-success text-sys-text-on-success" },
  { cssVar: "--sys-text-on-success", tailwindClass: "text-sys-text-on-success", type: "fg", category: ["text", "states"], textClasses: "bg-sys-accent text-sys-text-on-success" },
  
  // Component Tokens - Buttons - Primary
  { cssVar: "--sys-btn-primary-bg", tailwindClass: "bg-sys-btn-primary-bg", type: "bg", category: ["buttons"], bgClasses: "bg-sys-btn-primary-bg text-sys-text-inverse" },
  { cssVar: "--sys-btn-primary-bg-hover", tailwindClass: "bg-sys-btn-primary-bg-hover", type: "bg", category: ["buttons"], bgClasses: "bg-sys-btn-primary-bg-hover text-sys-text-inverse" },
  { cssVar: "--sys-btn-primary-bg-active", tailwindClass: "bg-sys-btn-primary-bg-active", type: "bg", category: ["buttons"], bgClasses: "bg-sys-btn-primary-bg-active text-sys-text-inverse" },
  { cssVar: "--sys-btn-primary-fg", tailwindClass: "text-sys-btn-primary-fg", type: "fg", category: ["buttons"], textClasses: "bg-sys-btn-primary-bg text-sys-btn-primary-fg" },
  
  // Component Tokens - Buttons - Secondary
  { cssVar: "--sys-btn-secondary-bg", tailwindClass: "bg-sys-btn-secondary-bg", type: "bg", category: ["buttons"], bgClasses: "bg-sys-btn-secondary-bg text-sys-btn-secondary-fg" },
  { cssVar: "--sys-btn-secondary-bg-hover", tailwindClass: "bg-sys-btn-secondary-bg-hover", type: "bg", category: ["buttons"], bgClasses: "bg-sys-btn-secondary-bg-hover text-sys-btn-secondary-fg" },
  { cssVar: "--sys-btn-secondary-bg-active", tailwindClass: "bg-sys-btn-secondary-bg-active", type: "bg", category: ["buttons"], bgClasses: "bg-sys-btn-secondary-bg-active text-sys-btn-secondary-fg" },
  { cssVar: "--sys-btn-secondary-fg", tailwindClass: "text-sys-btn-secondary-fg", type: "fg", category: ["buttons"], textClasses: "bg-sys-btn-secondary-bg text-sys-btn-secondary-fg" },
  
  // Component Tokens - Buttons - Tertiary
  { cssVar: "--sys-btn-tertiary-bg", tailwindClass: "bg-sys-btn-tertiary-bg", type: "bg", category: ["buttons"], bgClasses: "bg-sys-btn-tertiary-bg text-sys-text-inverse" },
  { cssVar: "--sys-btn-tertiary-bg-hover", tailwindClass: "bg-sys-btn-tertiary-bg-hover", type: "bg", category: ["buttons"], bgClasses: "bg-sys-btn-tertiary-bg-hover text-sys-text-inverse" },
  { cssVar: "--sys-btn-tertiary-bg-active", tailwindClass: "bg-sys-btn-tertiary-bg-active", type: "bg", category: ["buttons"], bgClasses: "bg-sys-btn-tertiary-bg-active text-sys-text-inverse" },
  { cssVar: "--sys-btn-tertiary-fg", tailwindClass: "text-sys-btn-tertiary-fg", type: "fg", category: ["buttons"], textClasses: "bg-sys-btn-tertiary-bg text-sys-btn-tertiary-fg" },
  
  // Component Tokens - Buttons - Outline
  { cssVar: "--sys-btn-outline-border", tailwindClass: "border-sys-btn-outline-border", type: "both", category: ["buttons"], bgClasses: "bg-sys-surface border-[3px] border-sys-btn-outline-border", textClasses: "bg-sys-surface border-[3px] border-sys-btn-outline-border" },
  { cssVar: "--sys-btn-outline-border-hover", tailwindClass: "border-sys-btn-outline-border-hover", type: "both", category: ["buttons"], bgClasses: "bg-sys-surface border-[3px] border-sys-btn-outline-border-hover", textClasses: "bg-sys-surface border-[3px] border-sys-btn-outline-border-hover" },
  { cssVar: "--sys-btn-outline-border-active", tailwindClass: "border-sys-btn-outline-border-active", type: "both", category: ["buttons"], bgClasses: "bg-sys-surface border-[3px] border-sys-btn-outline-border-active", textClasses: "bg-sys-surface border-[3px] border-sys-btn-outline-border-active" },
  { cssVar: "--sys-btn-outline-fg", tailwindClass: "text-sys-btn-outline-fg", type: "fg", category: ["buttons"], textClasses: "bg-sys-surface text-sys-btn-outline-fg" },
  { cssVar: "--sys-btn-outline-fg-hover", tailwindClass: "text-sys-btn-outline-fg-hover", type: "fg", category: ["buttons"], textClasses: "bg-sys-surface text-sys-btn-outline-fg-hover" },
  { cssVar: "--sys-btn-outline-fg-active", tailwindClass: "text-sys-btn-outline-fg-active", type: "fg", category: ["buttons"], textClasses: "bg-sys-surface text-sys-btn-outline-fg-active" },
  
  // Component Tokens - Buttons - Interactive
  { cssVar: "--sys-btn-interactive-border", tailwindClass: "border-sys-btn-interactive-border", type: "both", category: ["buttons"], bgClasses: "bg-sys-surface border-[3px] border-sys-btn-interactive-border", textClasses: "bg-sys-surface border-[3px] border-sys-btn-interactive-border" },
  { cssVar: "--sys-btn-interactive-border-hover", tailwindClass: "border-sys-btn-interactive-border-hover", type: "both", category: ["buttons"], bgClasses: "bg-sys-surface border-[3px] border-sys-btn-interactive-border-hover", textClasses: "bg-sys-surface border-[3px] border-sys-btn-interactive-border-hover" },
  { cssVar: "--sys-btn-interactive-border-active", tailwindClass: "border-sys-btn-interactive-border-active", type: "both", category: ["buttons"], bgClasses: "bg-sys-surface border-[3px] border-sys-btn-interactive-border-active", textClasses: "bg-sys-surface border-[3px] border-sys-btn-interactive-border-active" },
  { cssVar: "--sys-btn-interactive-fg", tailwindClass: "text-sys-btn-interactive-fg", type: "fg", category: ["buttons"], textClasses: "bg-sys-surface text-sys-btn-interactive-fg" },
  { cssVar: "--sys-btn-interactive-fg-hover", tailwindClass: "text-sys-btn-interactive-fg-hover", type: "fg", category: ["buttons"], textClasses: "bg-sys-surface text-sys-btn-interactive-fg-hover" },
  { cssVar: "--sys-btn-interactive-fg-active", tailwindClass: "text-sys-btn-interactive-fg-active", type: "fg", category: ["buttons"], textClasses: "bg-sys-surface text-sys-btn-interactive-fg-active" },
  
  // Component Tokens - Cards
  { cssVar: "--sys-card-bg", tailwindClass: "bg-sys-card-bg", type: "bg", category: ["cards"], bgClasses: "bg-sys-card-bg" },
  
  // Component Tokens - Chips
  { cssVar: "--sys-chip-bg", tailwindClass: "bg-sys-chip-bg", type: "bg", category: ["chips"], bgClasses: "bg-sys-chip-bg text-sys-chip-fg" },
  { cssVar: "--sys-chip-fg", tailwindClass: "text-sys-chip-fg", type: "fg", category: ["chips"], textClasses: "bg-sys-chip-bg text-sys-chip-fg" },
  
  // Component Tokens - Inputs
  { cssVar: "--sys-input-bg", tailwindClass: "bg-sys-input-bg", type: "bg", category: ["inputs"], bgClasses: "bg-sys-input-bg text-sys-input-fg" },
  { cssVar: "--sys-input-fg", tailwindClass: "text-sys-input-fg", type: "fg", category: ["inputs"], textClasses: "bg-sys-input-bg text-sys-input-fg" },
  
  // Component Tokens - Nav
  { cssVar: "--sys-nav-bg", tailwindClass: "bg-sys-nav-bg", type: "bg", category: ["nav"], bgClasses: "bg-sys-nav-bg text-sys-nav-fg" },
  { cssVar: "--sys-nav-fg", tailwindClass: "text-sys-nav-fg", type: "fg", category: ["nav"], textClasses: "bg-sys-nav-bg text-sys-nav-fg" },
  { cssVar: "--sys-nav-link", tailwindClass: "text-sys-nav-link", type: "fg", category: ["nav", "links"], textClasses: "bg-sys-nav-bg text-sys-nav-link" },
]

export function ColorVariablesTable() {
  const [filter, setFilter] = useState<VariableType | "all">("all")
  const [categoryFilter, setCategoryFilter] = useState<VariableCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const deferredSearchQuery = useDeferredValue(searchQuery)
  const [, startTransition] = useTransition()

  const computedVariables = useMemo(() => {
    return colorVariables.map((variable) => {
      const bgTokens = variable.bgClasses?.split(/\s+/).filter(Boolean) ?? []
      const textTokens = variable.textClasses?.split(/\s+/).filter(Boolean) ?? []

      // Extract background color class from bgClasses
      const bgColorClass =
        bgTokens.find((cls) => cls.startsWith("bg-")) ??
        (variable.type === "bg" && variable.tailwindClass.startsWith("bg-")
          ? variable.tailwindClass.split(" ")[0] // first class
          : null)

      // Extract border color class from bgClasses (for border variables)
      const borderColorClass =
        bgTokens.find((cls) => cls.startsWith("border-") && !cls.includes("[")) ?? null

      // Extract text color class from textClasses
      const textColorClass =
        textTokens.find((cls) => cls.startsWith("text-")) ??
        (variable.type === "fg" && variable.tailwindClass.startsWith("text-")
          ? variable.tailwindClass.split(" ")[0] // first class
          : null)

      const showBorder = variable.cssVar.includes("border")
      const backgroundDisplay = showBorder && borderColorClass ? borderColorClass : bgColorClass

      // For text column, use bg class from textClasses if available, otherwise row bg color.
      const textBgClass =
        textTokens.find((cls) => cls.startsWith("bg-")) ?? bgColorClass ?? "bg-sys-surface"

      return {
        ...variable,
        bgColorClass,
        borderColorClass,
        textColorClass,
        showBorder,
        backgroundDisplay,
        textBgClass,
      }
    })
  }, [])

  const filteredVariables = useMemo(() => {
    let filtered = computedVariables

    // Apply type filter
    if (filter !== "all") {
      filtered = filtered.filter((v) => v.type === filter)
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((v) => v.category.includes(categoryFilter))
    }

    // Apply search filter
    if (deferredSearchQuery.trim()) {
      const query = deferredSearchQuery.toLowerCase().trim()
      filtered = filtered.filter((v) => {
        const cssVarLower = v.cssVar.toLowerCase()
        const tailwindLower = v.tailwindClass.toLowerCase()
        return cssVarLower.includes(query) || tailwindLower.includes(query)
      })
    }

    return filtered
  }, [computedVariables, filter, categoryFilter, deferredSearchQuery])

  return (
    <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
      <div className="grid gap-space-10">
        <h3 className="text-sys-text">Color Variables Reference</h3>
        
        {/* Controls */}
        <div className="grid gap-space-10">
          {/* Search Input */}
          <div>
            <input
              type="text"
              placeholder="Search variables (e.g., 'accent', 'text-on', 'btn')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-space-10 border border-sys-border rounded-radius-md bg-sys-input-bg text-sys-input-fg pobut-body focus:outline-none focus:ring-2 focus:ring-sys-focus focus:border-sys-focus"
            />
          </div>

          {/* Type Filter Buttons */}
          <div>
            <div className="mb-space-10 text-sys-text-muted pobut-body">Type:</div>
            <div className="flex flex-wrap gap-space-10">
              <button
                onClick={() => startTransition(() => setFilter("all"))}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  filter === "all"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                All
              </button>
              <button
                onClick={() => startTransition(() => setFilter("bg"))}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  filter === "bg"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Background
              </button>
              <button
                onClick={() => startTransition(() => setFilter("fg"))}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  filter === "fg"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Foreground
              </button>
              <button
                onClick={() => startTransition(() => setFilter("both"))}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  filter === "both"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Both
              </button>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div>
            <div className="mb-space-10 text-sys-text-muted pobut-body">Category:</div>
            <div className="flex flex-wrap gap-space-10">
              <button
                onClick={() => startTransition(() => setCategoryFilter("all"))}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "all"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                All
              </button>
              <button
                onClick={() => startTransition(() => setCategoryFilter("surfaces"))}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "surfaces"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Surfaces
              </button>
              <button
                onClick={() => startTransition(() => setCategoryFilter("text"))}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "text"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Text
              </button>
              <button
                onClick={() => startTransition(() => setCategoryFilter("states"))}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "states"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                States
              </button>
              <button
                onClick={() => startTransition(() => setCategoryFilter("buttons"))}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "buttons"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Buttons
              </button>
              <button
                onClick={() => startTransition(() => setCategoryFilter("cards"))}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "cards"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => startTransition(() => setCategoryFilter("chips"))}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "chips"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Chips
              </button>
              <button
                onClick={() => startTransition(() => setCategoryFilter("inputs"))}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "inputs"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Inputs
              </button>
              <button
                onClick={() => startTransition(() => setCategoryFilter("nav"))}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "nav"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Navigation
              </button>
              <button
                onClick={() => startTransition(() => setCategoryFilter("links"))}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "links"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Links
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="text-sys-text-muted pobut-body">
            Showing {filteredVariables.length} of {colorVariables.length} variables
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-sys-border">
                <th className="text-left p-space-10 text-sys-text pobut-body">CSS Variable</th>
                <th className="text-left p-space-10 text-sys-text pobut-body">Tailwind Class</th>
                <th className="text-left p-space-10 text-sys-text pobut-body">Background</th>
                <th className="text-left p-space-10 text-sys-text pobut-body">Text</th>
              </tr>
            </thead>
            <tbody className="pobut-body">
              {filteredVariables.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-space-20 text-center text-sys-text-muted">
                    No variables found matching your search.
                  </td>
                </tr>
              ) : (
                filteredVariables.map((variable) => {
                  return (
                    <tr key={variable.cssVar} className="border-b border-sys-border-subtle">
                      <td className="p-space-10 font-mono text-sys-text-muted">{variable.cssVar}</td>
                      <td className="p-space-10 font-mono text-sys-text-muted">{variable.tailwindClass}</td>
                      <td className="p-space-10">
                        {variable.backgroundDisplay ? (
                          variable.showBorder && variable.borderColorClass ? (
                            <div className={`bg-sys-surface min-w-[120px] min-h-[40px] rounded-radius-sm border-[3px] ${variable.borderColorClass}`} />
                          ) : (
                            <div className={`${variable.bgColorClass} min-w-[120px] min-h-[40px] rounded-radius-sm border border-sys-border-subtle`} />
                          )
                        ) : (
                          <span className="text-sys-text-subtle">—</span>
                        )}
                      </td>
                      <td className="p-space-10">
                        {variable.textColorClass ? (
                          <div className={`${variable.textBgClass} min-w-[120px] min-h-[40px] rounded-radius-sm border border-sys-border-subtle flex items-center justify-center`}>
                            <div className={`${variable.textColorClass} pobut-body`}>Aa</div>
                          </div>
                        ) : (
                          <span className="text-sys-text-subtle">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

