import './style.css'

const TIME_SLOTS = ['Morning', 'Afternoon', 'Evening']

const VIBE_ACTIVITIES = {
  Foodie: {
    Saturday: {
      Morning: ['Farmers market tasting tour', 'Third-wave coffee crawl'],
      Afternoon: ['Chef-led food hall lunch', 'Neighborhood bakery hop'],
      Evening: ['Reservation-only bistro dinner', 'Dessert bar nightcap'],
    },
    Sunday: {
      Morning: ['Brunch at a local favorite', 'Artisan cheese shop stop'],
      Afternoon: ['Cooking class or wine pairing', 'Street food alley exploration'],
      Evening: ['Sunset rooftop bites', 'Night market snacks'],
    },
  },
  Budget: {
    Saturday: {
      Morning: ['Free walking tour', 'Park picnic breakfast'],
      Afternoon: ['Museum free-hour visit', 'Thrift & vintage browse'],
      Evening: ['Happy-hour small plates', 'Open-mic or free live music'],
    },
    Sunday: {
      Morning: ['Community run or yoga in the park', 'Coffee from a corner café'],
      Afternoon: ['Public garden afternoon', 'Library or gallery lounge'],
      Evening: ['Food truck dinner', 'Stargazing hill viewpoint'],
    },
  },
  Adventure: {
    Saturday: {
      Morning: ['Sunrise hike or coastal trail', 'Kayak or paddle rental'],
      Afternoon: ['Urban bike loop', 'Climbing gym or bouldering session'],
      Evening: ['Night zip-line or glow kayak', 'Campfire stories spot'],
    },
    Sunday: {
      Morning: ['Waterfall or canyon morning trek', 'Surf or SUP lesson'],
      Afternoon: ['Scenic drive with photo stops', 'Via ferrata or ropes course'],
      Evening: ['Hot springs soak', 'Bonfire beach walk'],
    },
  },
  Relaxing: {
    Saturday: {
      Morning: ['Slow breakfast & journaling', 'Botanical garden stroll'],
      Afternoon: ['Spa or thermal baths', 'Tea house reset'],
      Evening: ['Golden-hour waterfront walk', 'Acoustic lounge evening'],
    },
    Sunday: {
      Morning: ['Gentle yoga & meditation', 'Bookshop & café morning'],
      Afternoon: ['Massage or float session', 'Lake or pier lounging'],
      Evening: ['Home-cooked comfort dinner', 'Early night with a film'],
    },
  },
  'Family-Friendly': {
    Saturday: {
      Morning: ['Children’s museum morning', 'Playground picnic'],
      Afternoon: ['Zoo or aquarium visit', 'Mini-golf or arcade'],
      Evening: ['Family pizza night', 'Outdoor movie in the park'],
    },
    Sunday: {
      Morning: ['Science center exhibits', 'Farm visit & petting zoo'],
      Afternoon: ['Ice cream bike ride', 'Hands-on craft workshop'],
      Evening: ['Board-game café', 'Fireworks or fountain show'],
    },
  },
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

function activityCardId(day, slot, index) {
  return `${day}-${slot}-${index}`.replace(/\s+/g, '-').toLowerCase()
}

function renderActivityCard(day, slot, title, index) {
  const id = activityCardId(day, slot, index)
  const safeTitle = escapeHtml(title)
  return `
    <label
      for="${id}"
      class="activity-card group flex cursor-pointer gap-3 rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
      data-day="${escapeHtml(day)}"
      data-slot="${escapeHtml(slot)}"
    >
      <input
        type="checkbox"
        id="${id}"
        class="activity-check mt-0.5 size-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
        aria-label="Mark ${safeTitle} as completed"
      />
      <span class="min-w-0 flex-1">
        <span class="activity-title block text-sm font-medium text-slate-800 group-hover:text-indigo-900">${safeTitle}</span>
        <span class="mt-1 block text-xs text-slate-500">${escapeHtml(slot)} · ${escapeHtml(day)}</span>
      </span>
    </label>
  `
}

function renderTimeSlot(day, slot, activities) {
  const cards = activities
    .map((title, index) => renderActivityCard(day, slot, title, index))
    .join('')

  return `
    <div class="space-y-3">
      <div class="flex items-center gap-2">
        <span class="h-2 w-2 rounded-full bg-indigo-400"></span>
        <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-500">${escapeHtml(slot)}</h4>
      </div>
      <div class="space-y-2 border-l-2 border-indigo-100 pl-4">${cards}</div>
    </div>
  `
}

function renderDayColumn(day, plan) {
  const slots = TIME_SLOTS
    .map((slot) => renderTimeSlot(day, slot, plan[slot] ?? []))
    .join('')

  return `
    <article class="flex flex-col rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:p-6">
      <header class="mb-6 border-b border-slate-100 pb-4">
        <p class="text-xs font-medium uppercase tracking-widest text-indigo-500">Day</p>
        <h3 class="font-display text-2xl font-semibold text-slate-900">${escapeHtml(day)}</h3>
      </header>
      <div class="flex flex-1 flex-col gap-8">${slots}</div>
    </article>
  `
}

function renderItinerary(city, vibe) {
  const plan = VIBE_ACTIVITIES[vibe]
  if (!plan) return ''

  const subtitle = city
    ? `Sample weekend flow for <span class="font-medium text-indigo-700">${escapeHtml(city)}</span> · ${escapeHtml(vibe)} vibe`
    : `Sample weekend flow · ${escapeHtml(vibe)} vibe — add a city above`

  return `
    <section
      id="itinerary"
      class="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6 lg:px-8"
      aria-labelledby="itinerary-heading"
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
      <div class="grid gap-6 lg:grid-cols-2 lg:gap-8">
        ${renderDayColumn('Saturday', plan.Saturday)}
        ${renderDayColumn('Sunday', plan.Sunday)}
      </div>
    </section>
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

function renderApp(state) {
  const { city, vibe } = state
  return `
    <div class="min-h-svh">
      <header class="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-br from-slate-100 via-indigo-50/40 to-slate-50">
        <div class="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" aria-hidden="true"></div>
        <div class="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-amber-100/40 blur-3xl" aria-hidden="true"></div>
        <div class="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p class="mb-3 text-sm font-medium uppercase tracking-widest text-indigo-600">Weekend escape</p>
          <h1 class="font-display max-w-2xl text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            AI Weekend Itinerary Planner
          </h1>
          <p class="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
            Shape a two-day Saturday &amp; Sunday plan around your destination and travel style. Check off activities as you go.
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
                  ${Object.keys(VIBE_ACTIVITIES)
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
                class="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Generate itinerary
              </button>
              <p class="text-xs text-slate-500">Placeholder activities refresh when you change city or vibe.</p>
            </div>
          </form>
        </div>
      </header>

      <main>${renderItinerary(city, vibe)}</main>

      <footer class="border-t border-slate-200/80 py-8 text-center text-sm text-slate-500">
        Built for quick weekend planning · HTML5 &amp; Tailwind CSS
      </footer>
    </div>
  `
}

const appState = {
  city: '',
  vibe: 'Foodie',
}

const app = document.querySelector('#app')

function mount() {
  app.innerHTML = renderApp(appState)

  const form = document.getElementById('planner-form')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    appState.city = document.getElementById('destination').value.trim()
    appState.vibe = document.getElementById('vibe').value
    mount()
  })

  bindActivityInteractions(app)
}

mount()
