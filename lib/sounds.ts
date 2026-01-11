"use client"

/**
 * Terminal Sound Effects
 * Uses Web Audio API to generate retro-style click sounds
 */

// Audio context singleton
let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null

  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  }
  return audioContext
}

// Resume audio context on user interaction (required by browsers)
export function initAudio(): void {
  const ctx = getAudioContext()
  if (ctx?.state === "suspended") {
    ctx.resume()
  }
}

/**
 * Mechanical keyboard click sound
 */
export function playClick(): void {
  const ctx = getAudioContext()
  if (!ctx) return

  // Resume if suspended
  if (ctx.state === "suspended") {
    ctx.resume()
  }

  const now = ctx.currentTime

  // Create oscillator for the click
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()

  // High-pass filter for crisp click
  filter.type = "highpass"
  filter.frequency.value = 1000

  // Short burst oscillator
  osc.type = "square"
  osc.frequency.setValueAtTime(1800, now)
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.03)

  // Quick attack and decay
  gain.gain.setValueAtTime(0, now)
  gain.gain.linearRampToValueAtTime(0.08, now + 0.001)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

  // Connect nodes
  osc.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)

  // Play
  osc.start(now)
  osc.stop(now + 0.05)
}

/**
 * Softer, more subtle click
 */
export function playClickSoft(): void {
  const ctx = getAudioContext()
  if (!ctx) return

  if (ctx.state === "suspended") {
    ctx.resume()
  }

  const now = ctx.currentTime

  // Noise-based click (softer)
  const bufferSize = ctx.sampleRate * 0.02 // 20ms
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  // Generate noise burst
  for (let i = 0; i < bufferSize; i++) {
    // Exponential decay envelope
    const envelope = Math.exp(-i / (bufferSize * 0.1))
    data[i] = (Math.random() * 2 - 1) * envelope * 0.3
  }

  const source = ctx.createBufferSource()
  source.buffer = buffer

  // Filter for softer sound
  const filter = ctx.createBiquadFilter()
  filter.type = "bandpass"
  filter.frequency.value = 2000
  filter.Q.value = 1

  const gain = ctx.createGain()
  gain.gain.value = 0.06

  source.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)

  source.start(now)
}

/**
 * Retro beep sound (for confirmations)
 */
export function playBeep(): void {
  const ctx = getAudioContext()
  if (!ctx) return

  if (ctx.state === "suspended") {
    ctx.resume()
  }

  const now = ctx.currentTime

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = "sine"
  osc.frequency.value = 880 // A5

  gain.gain.setValueAtTime(0, now)
  gain.gain.linearRampToValueAtTime(0.05, now + 0.01)
  gain.gain.setValueAtTime(0.05, now + 0.05)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.1)
}

/**
 * Error/warning sound
 */
export function playError(): void {
  const ctx = getAudioContext()
  if (!ctx) return

  if (ctx.state === "suspended") {
    ctx.resume()
  }

  const now = ctx.currentTime

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = "sawtooth"
  osc.frequency.setValueAtTime(200, now)
  osc.frequency.setValueAtTime(150, now + 0.1)

  gain.gain.setValueAtTime(0.04, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.2)
}

/**
 * Hover sound (very subtle)
 */
export function playHover(): void {
  const ctx = getAudioContext()
  if (!ctx) return

  if (ctx.state === "suspended") {
    ctx.resume()
  }

  const now = ctx.currentTime

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = "sine"
  osc.frequency.value = 2400

  gain.gain.setValueAtTime(0, now)
  gain.gain.linearRampToValueAtTime(0.015, now + 0.005)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.03)
}

/**
 * Typewriter keystroke sound - for text appearing character by character
 */
export function playTypewriter(): void {
  const ctx = getAudioContext()
  if (!ctx) return

  if (ctx.state === "suspended") {
    ctx.resume()
  }

  const now = ctx.currentTime

  // Mechanical typewriter strike sound
  const bufferSize = Math.floor(ctx.sampleRate * 0.025) // 25ms
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  // Generate sharp click with quick decay
  for (let i = 0; i < bufferSize; i++) {
    const envelope = Math.exp(-i / (bufferSize * 0.08))
    // Mix of noise and a tiny pitched component
    const noise = (Math.random() * 2 - 1) * envelope
    const click = Math.sin(i * 0.15) * envelope * 0.5
    data[i] = (noise + click) * 0.8
  }

  const source = ctx.createBufferSource()
  source.buffer = buffer

  // Bandpass filter for that mechanical sound
  const filter = ctx.createBiquadFilter()
  filter.type = "bandpass"
  filter.frequency.value = 1200 + Math.random() * 400 // Slight variation
  filter.Q.value = 1.5

  const gain = ctx.createGain()
  gain.gain.value = 0.04

  source.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)

  source.start(now)
}

/**
 * Typewriter carriage return / line feed sound
 */
export function playTypewriterReturn(): void {
  const ctx = getAudioContext()
  if (!ctx) return

  if (ctx.state === "suspended") {
    ctx.resume()
  }

  const now = ctx.currentTime

  // Mechanical slide + ding sound
  const bufferSize = Math.floor(ctx.sampleRate * 0.15) // 150ms
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  // Generate sliding mechanical sound
  for (let i = 0; i < bufferSize; i++) {
    const t = i / ctx.sampleRate
    const envelope = Math.exp(-t * 15)
    // Descending pitch for the slide
    const slide = Math.sin(i * (0.3 - t * 0.5)) * envelope * 0.3
    // Noise component
    const noise = (Math.random() * 2 - 1) * envelope * 0.2
    data[i] = slide + noise
  }

  const source = ctx.createBufferSource()
  source.buffer = buffer

  const filter = ctx.createBiquadFilter()
  filter.type = "lowpass"
  filter.frequency.value = 2000

  const gain = ctx.createGain()
  gain.gain.value = 0.03

  source.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)

  source.start(now)
}

/**
 * Boot sound - Old computer startup with HDD spin-up
 * Includes: POST beep, HDD motor spin-up, seek sounds
 */
export function playBootSound(): void {
  const ctx = getAudioContext()
  if (!ctx) return

  if (ctx.state === "suspended") {
    ctx.resume()
  }

  const now = ctx.currentTime

  // === 1. POST Beep (classic BIOS beep) ===
  const postOsc = ctx.createOscillator()
  const postGain = ctx.createGain()

  postOsc.type = "square"
  postOsc.frequency.value = 1000 // Classic POST beep frequency

  postGain.gain.setValueAtTime(0, now)
  postGain.gain.linearRampToValueAtTime(0.06, now + 0.01)
  postGain.gain.setValueAtTime(0.06, now + 0.15)
  postGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)

  postOsc.connect(postGain)
  postGain.connect(ctx.destination)

  postOsc.start(now)
  postOsc.stop(now + 0.2)

  // === 2. HDD Spin-up Motor Sound ===
  // Low frequency rumble that increases in pitch (motor spinning up)
  const hddMotorOsc = ctx.createOscillator()
  const hddMotorGain = ctx.createGain()
  const hddMotorFilter = ctx.createBiquadFilter()

  hddMotorOsc.type = "sawtooth"
  // Spin up from low to higher frequency
  hddMotorOsc.frequency.setValueAtTime(30, now + 0.3)
  hddMotorOsc.frequency.exponentialRampToValueAtTime(80, now + 1.0)
  hddMotorOsc.frequency.setValueAtTime(80, now + 2.5)

  hddMotorFilter.type = "lowpass"
  hddMotorFilter.frequency.value = 200
  hddMotorFilter.Q.value = 1

  hddMotorGain.gain.setValueAtTime(0, now + 0.3)
  hddMotorGain.gain.linearRampToValueAtTime(0.04, now + 0.5)
  hddMotorGain.gain.setValueAtTime(0.04, now + 2.0)
  hddMotorGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5)

  hddMotorOsc.connect(hddMotorFilter)
  hddMotorFilter.connect(hddMotorGain)
  hddMotorGain.connect(ctx.destination)

  hddMotorOsc.start(now + 0.3)
  hddMotorOsc.stop(now + 2.5)

  // === 3. HDD Head Seek Sounds (clicking/scratching) ===
  const seekTimes = [0.5, 0.7, 0.85, 1.1, 1.4, 1.6, 1.85]

  seekTimes.forEach((offset) => {
    const seekTime = now + offset

    // Create noise burst for seek sound
    const bufferSize = Math.floor(ctx.sampleRate * 0.03) // 30ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)

    // Generate clicking noise
    for (let i = 0; i < bufferSize; i++) {
      const envelope = Math.exp(-i / (bufferSize * 0.15))
      data[i] = (Math.random() * 2 - 1) * envelope
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer

    const seekFilter = ctx.createBiquadFilter()
    seekFilter.type = "bandpass"
    seekFilter.frequency.value = 800 + Math.random() * 400
    seekFilter.Q.value = 2

    const seekGain = ctx.createGain()
    seekGain.gain.value = 0.03 + Math.random() * 0.02

    source.connect(seekFilter)
    seekFilter.connect(seekGain)
    seekGain.connect(ctx.destination)

    source.start(seekTime)
  })

  // === 4. Electrical Hum (subtle) ===
  const humOsc = ctx.createOscillator()
  const humGain = ctx.createGain()

  humOsc.type = "sine"
  humOsc.frequency.value = 60 // 60Hz electrical hum

  humGain.gain.setValueAtTime(0, now)
  humGain.gain.linearRampToValueAtTime(0.008, now + 0.2)
  humGain.gain.setValueAtTime(0.008, now + 2.0)
  humGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5)

  humOsc.connect(humGain)
  humGain.connect(ctx.destination)

  humOsc.start(now)
  humOsc.stop(now + 2.5)
}

/**
 * Boot complete chime
 */
export function playBootComplete(): void {
  const ctx = getAudioContext()
  if (!ctx) return

  if (ctx.state === "suspended") {
    ctx.resume()
  }

  const now = ctx.currentTime

  // Two-tone success chime
  const frequencies = [523.25, 659.25] // C5, E5

  frequencies.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "sine"
    osc.frequency.value = freq

    const startTime = now + i * 0.12
    gain.gain.setValueAtTime(0, startTime)
    gain.gain.linearRampToValueAtTime(0.05, startTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(startTime)
    osc.stop(startTime + 0.3)
  })
}
