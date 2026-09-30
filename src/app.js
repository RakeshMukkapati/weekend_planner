import './style.css'

const VIBE_OPTIONS = ['Foodie', 'Budget', 'Adventure', 'Relaxing', 'Family-Friendly']

const GEMINI_MODEL = 'gemini-2.0-flash'
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

const appState = {
  city: '',
  vibe: 'Foodie',
  duration: 'Saturday & Sunday',
  itinerary: null,
  error: null,
  loading: false,
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text ?? ''
  return div.innerHTML
}

function activityCardId(day, index) {
  return `${day}-activity-${index}`.replace(/\s+/g, '-').toLowerCase()
}

function buildPrompt(city, vibe, duration) {
  return `You are an expert local travel guide. Create a detailed weekend itinerary for ${city} with a "${vibe}" travel style. The trip duration is ${duration}.

Return ONLY a strict JSON object with no markdown, no code fences, and no extra commentary. Use exactly this structure and keys (lowercase day names):
{
  "saturday": [
    { "time": "09:00 AM", "activity": "", "description": "", "cost": "" }
  ],
  "sunday": [
    { "time": "09:00 AM", "activity": "", "description": "", "cost": "" }
  ]
}

Include 4 to 6 activities per day spanning morning through evening. Use realistic local venues, concise descriptions (1-2 sentences), and plausible cost estimates (e.g. "$15", "Free", "€25").`
}

function extractJsonText(raw) {
  const trimmed = raw.trim()
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const candidate = fenceMatch ? fenceMatch[1].trim() : trimmed
  const start = candidate.indexOf('{')
  const end = candidate.lastIndexOf('}')
  if (start === -1 || end === -1) {
    throw new Error('Model response did not contain a JSON object.')
  }
  return candidate.slice(start, end + 1)
}

function normalizeItinerary(parsed) {
  const saturday = Array.isArray(parsed.saturday) ? parsed.saturday : []
  const sunday = Array.isArray(parsed.sunday) ? parsed.sunday : []
  const normalizeDay = (items) =>
    items.map((item) => ({
      time: String(item?.time ?? ''),
      activity: String(item?.activity ?? ''),
      description: String(item?.description ?? ''),
      cost: String(item?.cost ?? ''),
    }))

  return {
    saturday: normalizeDay(saturday),
    sunday: normalizeDay(sunday),
  }
}

async function fetchItineraryFromGemini(city, vibe, duration) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) {
    throw new Error(
      'Missing VITE_GEMINI_API_KEY. Add your Gemini API key to a .env file in the project root.',
    )
  }

  if (!city) {
    throw new Error('Please enter a destination city before generating an itinerary.')
  }

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(city, vibe, duration) }] }],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: 'application/json',
      },
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Gemini API error (${response.status}): ${detail.slice(0, 200)}`)
  }

  const data = await response.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) {
    throw new Error('Gemini returned an empty response.')
  }

  const jsonText = extractJsonText(text)
  const parsed = JSON.parse(jsonText)
  return normalizeItinerary(parsed)
}

function renderActivityCard(day, item, index) {
  const id = activityCardId(day, index)
  const title = escapeHtml(item.activity)
  return `
    <label
      for="${id}"
      class="activity-card group flex cursor-pointer gap-3 rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
    >
      <input
        type="checkbox"
        id="${id}"
        class="activity-check mt-1 size-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
        aria-label="Mark ${title} as completed"
      />
      <span class="min-w-0 flex-1">
        <span class="flex flex-wrap items-center gap-2">
          <span class="activity-title text-sm font-semibold text-slate-900 group-hover:text-indigo-900">${title}</span>
          <span class="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">${escapeHtml(item.time)}</span>
        </span>
        <span class="mt-1.5 block text-sm text-slate-600">${escapeHtml(item.description)}</span>
        <span class="mt-2 inline-block text-xs font-medium uppercase tracking-wide text-slate-500">Est. ${escapeHtml(item.cost)}</span>
      </span>
    </label>
  `
}

function renderDayColumn(dayLabel, key, items) {
  const cards = (items ?? [])
    .map((item, index) => renderActivityCard(key, item, index))
    .join('')

  const emptyState =
    cards ||
    '<p class="text-sm text-slate-500">Generate an itinerary to see activities for this day.</p>'

  return `
    <article class="flex flex-col rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:p-6">
      <header class="mb-6 border-b border-slate-100 pb-4">
        <p class="text-xs font-medium uppercase tracking-widest text-indigo-500">Day</p>
        <h3 class="font-display text-2xl font-semibold text-slate-900">${escapeHtml(dayLabel)}</h3>
      </header>
      <div class="flex flex-1 flex-col gap-3 border-l-2 border-indigo-100 pl-4">${emptyState}</div>
    </article>
  `
}

function renderItinerarySection() {
  const { city, vibe, itinerary, error } = appState

  const subtitle = city
    ? `Weekend in <span class="font-medium text-indigo-700">${escapeHtml(city)}</span> · ${escapeHtml(vibe)}`
    : 'Enter a city and generate your personalized weekend plan.'

  const errorBanner = error
    ? `<div class="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">${escapeHtml(error)}</div>`
    : ''

  const grid = itinerary
    ? `
      <div class="grid gap-6 lg:grid-cols-2 lg:gap-8">
        ${renderDayColumn('Saturday', 'saturday', itinerary.saturday)}
        ${renderDayColumn('Sunday', 'sunday', itinerary.sunday)}
      </div>
    `
    : `
      <div class="rounded-2xl border border-dashed border-slate-200 bg-white/60 px-6 py-12 text-center">
        <p class="text-slate-600">Your AI-generated timeline will appear here after you click <strong>Generate itinerary</strong>.</p>
      </div>
    `

  return `
    <section
      id="itinerary"
      class="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6 lg:px-8"
      aria-labelledby="itinerary-heading"
      aria-busy="${appState.loading}"
    >
      <div class="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="itinerary-heading" class="font-display text-xl font-semibold text-slate-900 sm:text-2xl">
            Your weekend timeline
          </h2>
          <p class="mt-1 text-sm text-slate-600">${subtitle}</p>
        </div>
        <p id="progress-label" class="text-sm font-medium text-slate-500" aria-live="polite">0 of 0 completed</p>
      </div>
      ${errorBanner}
      ${grid}
    </section>
  `
}

function renderSpinner() {
  return `
    <div
      id="loading-overlay"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-[2px]"
      role="status"
      aria-live="polite"
      aria-label="Generating itinerary"
    >
      <div class="flex flex-col items-center gap-4 rounded-2xl border border-white/80 bg-white px-8 py-6 shadow-xl">
        <div class="loading-spinner size-10 rounded-full border-4 border-indigo-200 border-t-indigo-600" aria-hidden="true"></div>
        <p class="text-sm font-medium text-slate-700">Crafting your weekend with Gemini…</p>
      </div>
    </div>
  `
}

function renderApp() {
  const { city, vibe, loading } = appState
  return `
    <div class="min-h-svh">
      ${loading ? renderSpinner() : ''}
      <header class="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-br from-slate-100 via-indigo-50/40 to-slate-50">
        <div class="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" aria-hidden="true"></div>
        <div class="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-amber-100/40 blur-3xl" aria-hidden="true"></div>
        <div class="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p class="mb-3 text-sm font-medium uppercase tracking-widest text-indigo-600">Weekend escape</p>
          <h1 class="font-display max-w-2xl text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            AI Weekend Itinerary Planner
          </h1>
          <p class="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
            Shape a two-day Saturday &amp; Sunday plan around your destination and travel style. Powered by Google Gemini.
          </p>

          <form id="planner-form" class="mt-10 rounded-2xl border border-white/60 bg-white/70 p-5 shadow-lg shadow-indigo-100/50 backdrop-blur-md sm:p-6">
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div class="sm:col-span-2 lg:col-span-2">
                <label for="destination" class="mb-1.5 block text-sm font-medium text-slate-700">Destination city</label>
                <input
                  type="search"
                  id="destination"
                  name="destination"
                  value="${escapeHtml(city)}"
                  placeholder="e.g. Lisbon, Portland, Tokyo"
                  autocomplete="off"
                  required
                  class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label for="vibe" class="mb-1.5 block text-sm font-medium text-slate-700">Vibe / style</label>
                <select
                  id="vibe"
                  name="vibe"
                  class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                >
                  ${VIBE_OPTIONS
                    .map(
                      (option) =>
                        `<option value="${escapeHtml(option)}"${option === vibe ? ' selected' : ''}>${escapeHtml(option)}</option>`,
                    )
                    .join('')}
                </select>
              </div>
              <div>
                <label for="duration" class="mb-1.5 block text-sm font-medium text-slate-700">Trip duration</label>
                <select
                  id="duration"
                  name="duration"
                  disabled
                  aria-readonly="true"
                  title="Weekend trips are fixed to Saturday and Sunday"
                  class="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-600 shadow-sm"
                >
                  <option selected>Saturday &amp; Sunday</option>
                </select>
              </div>
            </div>
            <div class="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                id="generate-btn"
                class="inline-flex min-w-[10rem] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                ${loading ? 'disabled' : ''}
              >
                Generate itinerary
              </button>
              <p class="text-xs text-slate-500">Requires a Gemini API key in <code class="text-indigo-700">.env</code>.</p>
            </div>
          </form>
        </div>
      </header>

      <main>${renderItinerarySection()}</main>

      <footer class="border-t border-slate-200/80 py-8 text-center text-sm text-slate-500">
        Built for quick weekend planning · HTML5 &amp; Tailwind CSS
      </footer>
    </div>
  `
}

function updateProgress() {
  const checks = document.querySelectorAll('.activity-check')
  const done = document.querySelectorAll('.activity-check:checked').length
  const label = document.getElementById('progress-label')
  if (label) {
    label.textContent = `${done} of ${checks.length} completed`
  }
}

function bindActivityInteractions(root) {
  root.querySelectorAll('.activity-check').forEach((input) => {
    input.addEventListener('change', () => {
      const card = input.closest('.activity-card')
      if (card) {
        card.classList.toggle('activity-card--done', input.checked)
      }
      updateProgress()
    })
  })
  updateProgress()
}

function collectFormValues() {
  const city = document.getElementById('destination').value.trim()
  const vibe = document.getElementById('vibe').value
  const durationSelect = document.getElementById('duration')
  const duration = durationSelect?.options[durationSelect.selectedIndex]?.text ?? 'Saturday & Sunday'
  return { city, vibe, duration }
}

async function handleGenerateItinerary(event) {
  event.preventDefault()
  const { city, vibe, duration } = collectFormValues()

  appState.city = city
  appState.vibe = vibe
  appState.duration = duration
  appState.error = null
  appState.loading = true
  mountShell()

  try {
    appState.itinerary = await fetchItineraryFromGemini(city, vibe, duration)
  } catch (err) {
    appState.error = err instanceof Error ? err.message : 'Something went wrong while generating your itinerary.'
  } finally {
    appState.loading = false
    mountShell()
  }
}

const appRoot = document.querySelector('#app')

function mountShell() {
  appRoot.innerHTML = renderApp()

  const form = document.getElementById('planner-form')
  form.addEventListener('submit', handleGenerateItinerary)

  bindActivityInteractions(appRoot)
}

mountShell()
