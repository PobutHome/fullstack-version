"use client"

import { useState, useMemo } from "react"

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
  { cssVar: "--sys-success", tailwindClass: "bg-sys-success / text-sys-success", type: "both", category: ["states"], bgClasses: "bg-sys-accent text-sys-text-on-success", textClasses: "bg-sys-surface text-sys-accent" },
  { cssVar: "--sys-text-on-success", tailwindClass: "text-sys-text-on-success", type: "fg", category: ["text", "states"], textClasses: "bg-sys-accent text-sys-text-on-success" },
  
  // Component Tokens - Buttons
  { cssVar: "--sys-btn-primary-bg", tailwindClass: "bg-sys-btn-primary", type: "bg", category: ["buttons"], bgClasses: "bg-sys-btn-primary text-sys-btn-primary" },
  { cssVar: "--sys-btn-primary-fg", tailwindClass: "text-sys-btn-primary", type: "fg", category: ["buttons"], textClasses: "bg-sys-btn-primary text-sys-btn-primary" },
  { cssVar: "--sys-btn-secondary-bg", tailwindClass: "bg-sys-btn-secondary", type: "bg", category: ["buttons"], bgClasses: "bg-sys-btn-secondary text-sys-btn-secondary" },
  { cssVar: "--sys-btn-secondary-fg", tailwindClass: "text-sys-btn-secondary", type: "fg", category: ["buttons"], textClasses: "bg-sys-btn-secondary text-sys-btn-secondary" },
  { cssVar: "--sys-btn-outline-fg", tailwindClass: "text-sys-btn-outline", type: "fg", category: ["buttons"], textClasses: "bg-sys-surface text-sys-btn-outline" },
  { cssVar: "--sys-btn-interactive-fg", tailwindClass: "text-sys-btn-interactive", type: "fg", category: ["buttons"], textClasses: "bg-sys-surface text-sys-btn-interactive" },
  
  // Component Tokens - Cards
  { cssVar: "--sys-card-bg", tailwindClass: "bg-sys-card", type: "bg", category: ["cards"], bgClasses: "bg-sys-card" },
  
  // Component Tokens - Chips
  { cssVar: "--sys-chip-bg", tailwindClass: "bg-sys-chip", type: "bg", category: ["chips"], bgClasses: "bg-sys-chip text-sys-chip" },
  { cssVar: "--sys-chip-fg", tailwindClass: "text-sys-chip", type: "fg", category: ["chips"], textClasses: "bg-sys-chip text-sys-chip" },
  
  // Component Tokens - Inputs
  { cssVar: "--sys-input-bg", tailwindClass: "bg-sys-input", type: "bg", category: ["inputs"], bgClasses: "bg-sys-input text-sys-input" },
  { cssVar: "--sys-input-fg", tailwindClass: "text-sys-input", type: "fg", category: ["inputs"], textClasses: "bg-sys-input text-sys-input" },
  
  // Component Tokens - Nav
  { cssVar: "--sys-nav-bg", tailwindClass: "bg-sys-nav", type: "bg", category: ["nav"], bgClasses: "bg-sys-nav text-sys-nav" },
  { cssVar: "--sys-nav-fg", tailwindClass: "text-sys-nav", type: "fg", category: ["nav"], textClasses: "bg-sys-nav text-sys-nav" },
  { cssVar: "--sys-nav-link", tailwindClass: "text-sys-nav-link", type: "fg", category: ["nav", "links"], textClasses: "bg-sys-nav text-sys-nav-link" },
]

export function ColorVariablesTable() {
  const [filter, setFilter] = useState<VariableType | "all">("all")
  const [categoryFilter, setCategoryFilter] = useState<VariableCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredVariables = useMemo(() => {
    let filtered = colorVariables

    // Apply type filter
    if (filter !== "all") {
      filtered = filtered.filter((v) => v.type === filter)
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((v) => v.category.includes(categoryFilter))
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter((v) => {
        const cssVarLower = v.cssVar.toLowerCase()
        const tailwindLower = v.tailwindClass.toLowerCase()
        return cssVarLower.includes(query) || tailwindLower.includes(query)
      })
    }

    return filtered
  }, [filter, categoryFilter, searchQuery])

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
                onClick={() => setFilter("all")}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  filter === "all"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("bg")}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  filter === "bg"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Background
              </button>
              <button
                onClick={() => setFilter("fg")}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  filter === "fg"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Foreground
              </button>
              <button
                onClick={() => setFilter("both")}
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
                onClick={() => setCategoryFilter("all")}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "all"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setCategoryFilter("surfaces")}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "surfaces"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Surfaces
              </button>
              <button
                onClick={() => setCategoryFilter("text")}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "text"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Text
              </button>
              <button
                onClick={() => setCategoryFilter("states")}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "states"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                States
              </button>
              <button
                onClick={() => setCategoryFilter("buttons")}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "buttons"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Buttons
              </button>
              <button
                onClick={() => setCategoryFilter("cards")}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "cards"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setCategoryFilter("chips")}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "chips"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Chips
              </button>
              <button
                onClick={() => setCategoryFilter("inputs")}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "inputs"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Inputs
              </button>
              <button
                onClick={() => setCategoryFilter("nav")}
                className={`px-space-20 py-space-10 rounded-radius-md pobut-body transition-colors ${
                  categoryFilter === "nav"
                    ? "bg-sys-accent text-sys-text-on-accent"
                    : "bg-sys-surface-2 text-sys-text hover:bg-sys-surface-accent hover:text-sys-text-on-accent"
                }`}
              >
                Navigation
              </button>
              <button
                onClick={() => setCategoryFilter("links")}
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
                filteredVariables.map((variable, index) => (
                  <tr key={index} className="border-b border-sys-border-subtle">
                    <td className="p-space-10 font-mono text-sys-text-muted">{variable.cssVar}</td>
                    <td className="p-space-10 font-mono text-sys-text-muted">{variable.tailwindClass}</td>
                    <td className="p-space-10">
                      {variable.bgClasses ? (
                        <span className={variable.bgClasses}>Background</span>
                      ) : (
                        <span className="text-sys-text-subtle">—</span>
                      )}
                    </td>
                    <td className="p-space-10">
                      {variable.textClasses ? (
                        <span className={variable.textClasses}>Text</span>
                      ) : (
                        <span className="text-sys-text-subtle">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

