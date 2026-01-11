"use client"

import * as React from "react"
import { motion } from "motion/react"
import { AtariStripe, StatusDot } from "@/components/terminal"
import { cn } from "@/lib/utils"

// Technology icons from svgl.app (terminal-themed versions)
const icons = {
  typescript: () => (
    <svg viewBox="0 0 256 256" className="size-full" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z" fill="#3178C6"/>
      <path d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z" fill="#FFF"/>
    </svg>
  ),
  react: () => (
    <svg viewBox="0 0 256 228" className="size-full" xmlns="http://www.w3.org/2000/svg">
      <path d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.99 4.76-1.53 29.151-10.09 48.443-25.755 48.443-41.378 0-14.957-17.776-29.923-45.518-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345-3.24-10.257-7.612-21.163-12.963-32.432 5.106-11 9.31-21.767 12.459-31.957 2.619.758 5.16 1.557 7.61 2.4 23.69 8.156 38.14 20.213 38.14 29.504 0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787-1.524 8.219-4.59 13.698-8.382 15.893-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246 12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994 7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863-6.35-5.437-9.555-10.836-9.555-15.216 0-9.322 13.897-21.212 37.076-29.293 2.813-.98 5.757-1.905 8.812-2.773 3.204 10.42 7.406 21.315 12.477 32.332-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789 8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152 7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793 2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433 4.902.192 9.899.29 14.978.29 5.218 0 10.376-.117 15.453-.343-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026 347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815 329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627 310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876 7.93 0 15.778.303 23.387.883a329.357 329.357 0 0 1 12.334 19.695 358.489 358.489 0 0 1 11.036 20.54 329.472 329.472 0 0 1-11.031 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026-.344 1.668-.73 3.367-1.15 5.09-10.622-2.452-22.155-4.275-34.23-5.408-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86-22.86-10.235-22.86-22.86 10.235-22.86 22.86-22.86Z" fill="#61DAFB"/>
    </svg>
  ),
  nextjs: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" className="size-full">
      <mask height="180" id="mask0" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{maskType: "alpha"}}>
        <circle cx="90" cy="90" fill="black" r="90"/>
      </mask>
      <g mask="url(#mask0)">
        <circle cx="90" cy="90" fill="var(--term-text)" r="90"/>
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_next)"/>
        <rect fill="url(#paint1_next)" height="72" width="12" x="115" y="54"/>
      </g>
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id="paint0_next" x1="109" x2="144.5" y1="116.5" y2="160.5">
          <stop stopColor="var(--term-bg)"/>
          <stop offset="1" stopColor="var(--term-bg)" stopOpacity="0"/>
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="paint1_next" x1="121" x2="120.799" y1="54" y2="106.875">
          <stop stopColor="var(--term-bg)"/>
          <stop offset="1" stopColor="var(--term-bg)" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  nodejs: () => (
    <svg viewBox="0 0 256 292" xmlns="http://www.w3.org/2000/svg" className="size-full">
      <defs>
        <linearGradient id="nodea" x1="68.188%" x2="27.823%" y1="17.487%" y2="89.755%">
          <stop offset="0%" stopColor="#41873F"/>
          <stop offset="32.88%" stopColor="#418B3D"/>
          <stop offset="63.52%" stopColor="#419637"/>
          <stop offset="93.19%" stopColor="#3FA92D"/>
          <stop offset="100%" stopColor="#3FAE2A"/>
        </linearGradient>
        <linearGradient id="nodec" x1="43.277%" x2="159.245%" y1="55.169%" y2="-18.306%">
          <stop offset="13.76%" stopColor="#41873F"/>
          <stop offset="40.32%" stopColor="#54A044"/>
          <stop offset="71.36%" stopColor="#66B848"/>
          <stop offset="90.81%" stopColor="#6CC04A"/>
        </linearGradient>
        <linearGradient id="nodef" x1="-4.389%" x2="101.499%" y1="49.997%" y2="49.997%">
          <stop offset="9.192%" stopColor="#6CC04A"/>
          <stop offset="28.64%" stopColor="#66B848"/>
          <stop offset="59.68%" stopColor="#54A044"/>
          <stop offset="86.24%" stopColor="#41873F"/>
        </linearGradient>
      </defs>
      <path fill="url(#nodea)" d="M134.923 1.832c-4.344-2.443-9.502-2.443-13.846 0L6.787 67.801C2.443 70.244 0 74.859 0 79.745v132.208c0 4.887 2.715 9.502 6.787 11.945l114.29 65.968c4.344 2.444 9.502 2.444 13.846 0l114.29-65.968c4.344-2.443 6.787-7.058 6.787-11.945V79.745c0-4.886-2.715-9.501-6.787-11.944L134.923 1.832Z"/>
      <path fill="url(#nodec)" d="M249.485 67.8 134.65 1.833c-1.086-.542-2.443-1.085-3.529-1.357L2.443 220.912c1.086 1.357 2.444 2.443 3.8 3.258l114.834 65.968c3.258 1.9 7.059 2.443 10.588 1.357L252.47 70.515c-.815-1.086-1.9-1.9-2.986-2.714Z"/>
      <path fill="url(#nodef)" d="M249.756 223.898c3.258-1.9 5.701-5.158 6.787-8.687L130.579.204c-3.258-.543-6.787-.272-9.773 1.628L6.786 67.53l122.979 224.238c1.628-.272 3.529-.815 5.158-1.63l114.833-66.239Z"/>
    </svg>
  ),
  tailwindcss: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 54 33" className="size-full">
      <g clipPath="url(#tailwinda)">
        <path fill="#38bdf8" fillRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" clipRule="evenodd"/>
      </g>
      <defs>
        <clipPath id="tailwinda">
          <path fill="#fff" d="M0 0h54v32.4H0z"/>
        </clipPath>
      </defs>
    </svg>
  ),
  postgresql: () => (
    <svg viewBox="0 0 256 264" xmlns="http://www.w3.org/2000/svg" className="size-full">
      <path d="M255.008 158.086c-1.535-4.649-5.556-7.887-10.756-8.664-2.452-.366-5.26-.21-8.583.475-5.792 1.195-10.089 1.65-13.225 1.738 11.837-19.985 21.462-42.775 27.003-64.228 8.96-34.689 4.172-50.492-1.423-57.64C233.217 10.847 211.614.683 185.552.372c-13.903-.18-26.108 2.837-32.39 4.86-4.584-1.466-15.279-4.263-27.756-4.894-19.793-.998-36.236 4.784-48.872 17.192C64.309 29.543 57.787 46.48 54.132 66.17c-6.134 33.053.695 82.402 17.983 128.483-5.709 5.32-9.397 12.107-9.753 19.525-.636 13.246 8.64 24.022 24.078 28.156 9.598 2.573 19.601 2.9 29.085 1.037 1.094-.214 2.177-.465 3.245-.754.03.744.055 1.486.074 2.226.171 6.692.332 13.04 1.36 19.022 1.64 9.536 5.56 17.166 12.009 23.370 10.904 10.482 24.626 10.08 36.49 9.725 1.836-.055 3.636-.109 5.39-.109 3.323 0 6.442.144 9.724.294.022.001 1.17.05 2.328.125 3.167.179 7.095.402 11.074.402 7.096 0 14.08-.693 17.775-4.617 3.545-3.764 4.93-10.21 4.93-22.912v-37.909c0-3.229.142-6.06.256-8.365.097-1.953.18-3.636.18-5.093 0-1.66-.087-3.47-.17-5.205l-.016-.32c-.042-.886-.082-1.77-.102-2.67.285-.026.57-.061.856-.101 5.324-.75 12.29-3.219 13.228-3.565 4.957-1.826 12.14-5.143 18.244-10.155 7.234-5.933 12.099-13.238 13.328-20.037.666-3.682.705-7.62.112-11.737ZM58.03 81.966c-.36.093-.717.182-1.073.27-1.196-21.025 2.185-39.149 10.013-53.513 7.454-13.687 18.536-23.63 32.93-29.554 12.59-5.184 27.18-6.636 43.343-4.315 8.478 1.218 15.054 3.135 18.036 4.14-7.017 2.333-13.564 5.602-19.5 9.734-14.24 9.92-24.93 24.158-31.737 42.294-3.179 8.467-5.315 17.18-6.405 25.946-14.508 1.232-31.09 2.856-45.608 4.998Zm171.994 72.656c-.913 5.073-4.751 11.076-10.528 16.463-5.085 4.739-11.109 7.615-15.276 9.241-.996.389-7.456 2.608-12.006 3.251-2.88.406-5.353 1.954-6.834 4.276a9.882 9.882 0 0 0-1.262 7.808c.18.687.374 1.431.575 2.266.534 2.202 1.139 4.698 1.2 7.317.048 2.109-.208 4.501-.463 6.77-.065.588-.129 1.17-.188 1.737-.151 1.453-.274 3.02-.385 4.482-.108 1.428-.207 2.754-.307 3.765-.033.33-.068.659-.104.959-.104.872-.2 1.697-.2 2.532 0 .674.067 1.463.228 2.443 0 .018.003.04.005.06.001.02 0 0 0 0-7.153-.084-14.077-.192-20.693-.311l-.012.318c-.01-.106-.027-.212-.038-.318-1.553-.145-2.945-.375-4.235-.7-5.4-1.362-8.81-4.149-10.75-8.79-2.195-5.25-2.463-12.298-2.722-19.093-.172-4.508-.349-9.17-1.041-13.565l-.034-.214-.06-.215a76.609 76.609 0 0 0-.72-2.378c-.157-.487-.323-.967-.495-1.439.063-.055.125-.111.187-.17 4.687-4.391 7.384-10.351 7.589-16.77.174-5.456-1.263-11.168-4.157-16.536l-.12-.215c-.186-.326-.384-.64-.595-.94a26.865 26.865 0 0 0-3.99-4.655 43.85 43.85 0 0 0-3.49-2.918c-.83-.62-1.658-1.254-2.453-1.969-.587-.528-1.145-1.095-1.66-1.69 11.83-35.943 14.366-77.69 6.466-106.926 19.838-8.594 45.68-11.25 67.55.11 15.422 8.009 28.133 23.142 34.22 42.82 1.885 6.09 3.108 12.526 3.608 19.054.584 7.598.114 15.265-1.418 22.82-1.054 5.192-2.564 10.475-4.493 15.73a215.167 215.167 0 0 1-6.561 15.25c-3.59 7.464-7.88 14.977-12.836 22.44-.32.48-.648.951-.984 1.415-.067.091-.134.18-.198.27.021-.017.014-.011.012-.007l.005-.003a60.714 60.714 0 0 1-.186.249c2.094-1.022 4.52-1.816 7.442-2.438 5.053-1.074 9.64-1.123 13.638-.144 2.767.676 4.12 1.938 4.471 3.006.342 1.036.127 2.646-.773 4.647Z" fill="#336791"/>
    </svg>
  ),
  prisma: () => (
    <svg viewBox="0 0 256 310" xmlns="http://www.w3.org/2000/svg" className="size-full">
      <path fill="var(--term-text)" d="M254.313 235.519L148 9.749A17.063 17.063 0 00133.473.037a16.87 16.87 0 00-15.533 8.052L2.633 194.848a17.465 17.465 0 00.193 18.747L59.2 300.896a18.13 18.13 0 0020.363 7.489l163.599-48.392a17.929 17.929 0 0011.26-9.722 17.542 17.542 0 00-.101-14.76l-.008.008zm-23.802 9.683l-138.823 41.05c-4.235 1.26-8.3-2.411-7.419-6.685l49.598-237.484c.927-4.443 7.063-5.147 9.003-1.035l91.814 194.973a6.63 6.63 0 01-4.18 9.18h.007z"/>
    </svg>
  ),
  vercel: () => (
    <svg viewBox="0 0 256 222" xmlns="http://www.w3.org/2000/svg" className="size-full">
      <path fill="var(--term-text)" d="m128 0 128 221.705H0z"/>
    </svg>
  ),
  git: () => (
    <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="size-full">
      <path fill="#F05032" d="m224.3 130.6-99-99a14.8 14.8 0 0 0-21 0L85 50.8l26.4 26.5a17.6 17.6 0 0 1 22.3 22.4l25.5 25.5a17.6 17.6 0 1 1-10.6 10l-23.7-23.8v62.5a17.7 17.7 0 1 1-14.5-.6v-63a17.6 17.6 0 0 1-9.6-23.1L75 61.5l-43.4 43.5a14.9 14.9 0 0 0 0 21l99 99a14.8 14.8 0 0 0 21 0l72.6-72.6a14.8 14.8 0 0 0 0-20.8"/>
    </svg>
  ),
  figma: () => (
    <svg width="54" height="80" viewBox="0 0 54 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
      <path d="M13.3333 80.0002C20.6933 80.0002 26.6667 74.0268 26.6667 66.6668V53.3335H13.3333C5.97333 53.3335 0 59.3068 0 66.6668C0 74.0268 5.97333 80.0002 13.3333 80.0002Z" fill="#0ACF83"/>
      <path d="M0 39.9998C0 32.6398 5.97333 26.6665 13.3333 26.6665H26.6667V53.3332H13.3333C5.97333 53.3332 0 47.3598 0 39.9998Z" fill="#A259FF"/>
      <path d="M0 13.3333C0 5.97333 5.97333 0 13.3333 0H26.6667V26.6667H13.3333C5.97333 26.6667 0 20.6933 0 13.3333Z" fill="#F24E1E"/>
      <path d="M26.6667 0H40.0001C47.3601 0 53.3334 5.97333 53.3334 13.3333C53.3334 20.6933 47.3601 26.6667 40.0001 26.6667H26.6667V0Z" fill="#FF7262"/>
      <path d="M53.3334 39.9998C53.3334 47.3598 47.3601 53.3332 40.0001 53.3332C32.6401 53.3332 26.6667 47.3598 26.6667 39.9998C26.6667 32.6398 32.6401 26.6665 40.0001 26.6665C47.3601 26.6665 53.3334 32.6398 53.3334 39.9998Z" fill="#1ABCFE"/>
    </svg>
  ),
  docker: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#008fe2" className="size-full">
      <path d="M13.98 11.08h2.12a.19.19 0 0 0 .19-.19V9.01a.19.19 0 0 0-.19-.19h-2.12a.18.18 0 0 0-.18.18v1.9c0 .1.08.18.18.18m-2.95-5.43h2.12a.19.19 0 0 0 .18-.19V3.57a.19.19 0 0 0-.18-.18h-2.12a.18.18 0 0 0-.19.18v1.9c0 .1.09.18.19.18m0 2.71h2.12a.19.19 0 0 0 .18-.18V6.29a.19.19 0 0 0-.18-.18h-2.12a.18.18 0 0 0-.19.18v1.89c0 .1.09.18.19.18m-2.93 0h2.12a.19.19 0 0 0 .18-.18V6.29a.18.18 0 0 0-.18-.18H8.1a.18.18 0 0 0-.18.18v1.89c0 .1.08.18.18.18m-2.96 0h2.11a.19.19 0 0 0 .19-.18V6.29a.18.18 0 0 0-.19-.18H5.14a.19.19 0 0 0-.19.18v1.89c0 .1.08.18.19.18m5.89 2.72h2.12a.19.19 0 0 0 .18-.19V9.01a.19.19 0 0 0-.18-.19h-2.12a.18.18 0 0 0-.19.18v1.9c0 .1.09.18.19.18m-2.93 0h2.12a.18.18 0 0 0 .18-.19V9.01a.18.18 0 0 0-.18-.19H8.1a.18.18 0 0 0-.18.18v1.9c0 .1.08.18.18.18m-2.96 0h2.11a.18.18 0 0 0 .19-.19V9.01a.18.18 0 0 0-.18-.19H5.14a.19.19 0 0 0-.19.19v1.88c0 .1.08.19.19.19m-2.92 0h2.12a.18.18 0 0 0 .18-.19V9.01a.18.18 0 0 0-.18-.19H2.22a.18.18 0 0 0-.19.18v1.9c0 .1.08.18.19.18m21.54-1.19c-.06-.05-.67-.51-1.95-.51-.34 0-.68.03-1.01.09a3.77 3.77 0 0 0-1.72-2.57l-.34-.2-.23.33a4.6 4.6 0 0 0-.6 1.43c-.24.97-.1 1.88.4 2.66a4.7 4.7 0 0 1-1.75.42H.76a.75.75 0 0 0-.76.75 11.38 11.38 0 0 0 .7 4.06 6.03 6.03 0 0 0 2.4 3.12c1.18.73 3.1 1.14 5.28 1.14.98 0 1.96-.08 2.93-.26a12.25 12.25 0 0 0 3.82-1.4 10.5 10.5 0 0 0 2.61-2.13c1.25-1.42 2-3 2.55-4.4h.23c1.37 0 2.21-.55 2.68-1 .3-.3.55-.66.7-1.06l.1-.28Z"/>
    </svg>
  ),
  bun: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 70" className="size-full">
      <path d="M71.09 20.74c-.16-.17-.33-.34-.5-.5s-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5A26.46 26.46 0 0 1 75.5 35.7c0 16.57-16.82 30.05-37.5 30.05-11.58 0-21.94-4.23-28.83-10.86l.5.5.5.5.5.5.5.5.5.5.5.5.5.5C19.55 65.3 30.14 69.75 42 69.75c20.68 0 37.5-13.48 37.5-30 0-7.06-3.04-13.75-8.41-19.01Z"/>
      <path d="M73 35.7c0 15.21-15.67 27.54-35 27.54S3 50.91 3 35.7C3 26.27 9 17.94 18.22 13S33.18 3 38 3s8.94 4.13 19.78 10C67 17.94 73 26.27 73 35.7Z" fill="#fbf0df"/>
      <path d="M73 35.7a21.67 21.67 0 0 0-.8-5.78c-2.73 33.3-43.35 34.9-59.32 24.94A40 40 0 0 0 38 63.24c19.3 0 35-12.35 35-27.54Z" fill="#f6dece"/>
      <path d="M24.53 11.17C29 8.49 34.94 3.46 40.78 3.45A9.29 9.29 0 0 0 38 3c-2.42 0-5 1.25-8.25 3.13-1.13.66-2.3 1.39-3.54 2.15-2.33 1.44-5 3.07-8 4.7C8.69 18.13 3 26.62 3 35.7v1.19c6.06-21.41 17.07-23.04 21.53-25.72Z" fill="#fffefc"/>
      <path d="M35.12 5.53A16.41 16.41 0 0 1 29.49 18c-.28.25-.06.73.30.59 3.37-1.31 7.92-5.23 6-13.14-.08-.45-.67-.33-.67.08Zm2.27 0A16.24 16.24 0 0 1 39 19c-.12.35.31.65.55.36 2.19-2.8 4.1-8.36-1.62-14.36-.29-.26-.74.14-.54.49Zm2.76-.17A16.42 16.42 0 0 1 47 17.12a.33.33 0 0 0 .65.11c.92-3.49.4-9.44-7.17-12.53-.4-.16-.66.38-.33.62Zm-18.46 10.4a16.94 16.94 0 0 0 10.47-9c.18-.36.75-.22.66.18-1.73 8-7.52 9.67-11.12 9.45-.38.01-.37-.52-.01-.63Z" fill="#ccbea7" fillRule="evenodd"/>
      <path d="M38 65.75C17.32 65.75.5 52.27.5 35.7c0-10 6.18-19.33 16.53-24.92 3-1.6 5.57-3.21 7.86-4.62 1.26-.78 2.45-1.51 3.6-2.19C32 1.89 35 .5 38 .5s5.62 1.2 8.9 3.14c1 .57 2 1.19 3.07 1.87 2.49 1.54 5.3 3.28 9 5.27C69.32 16.37 75.5 25.69 75.5 35.7c0 16.57-16.82 30.05-37.5 30.05ZM38 3c-2.42 0-5 1.25-8.25 3.13-1.13.66-2.3 1.39-3.54 2.15-2.33 1.44-5 3.07-8 4.7C8.69 18.13 3 26.62 3 35.7c0 15.19 15.7 27.55 35 27.55S73 50.89 73 35.7c0-9.08-5.69-17.57-15.22-22.7-3.78-2-6.73-3.88-9.12-5.36-1.09-.67-2.09-1.29-3-1.84C42.63 4 40.42 3 38 3Z"/>
      <g>
        <path d="M45.05 43a8.93 8.93 0 0 1-2.92 4.71 6.81 6.81 0 0 1-4 1.88A6.84 6.84 0 0 1 34 47.71 8.93 8.93 0 0 1 31.12 43a.72.72 0 0 1 .8-.81h12.34a.72.72 0 0 1 .79.81Z" fill="#b71422"/>
        <path d="M34 47.79a6.91 6.91 0 0 0 4.12 1.9 6.91 6.91 0 0 0 4.11-1.9 10.63 10.63 0 0 0 1-1.07 6.83 6.83 0 0 0-4.9-2.31 6.15 6.15 0 0 0-5 2.78c.23.21.43.41.67.6Z" fill="#ff6164"/>
        <path d="M34.16 47a5.36 5.36 0 0 1 4.19-2.08 6 6 0 0 1 4 1.69c.23-.25.45-.51.66-.77a7 7 0 0 0-4.71-1.93 6.36 6.36 0 0 0-4.89 2.36 9.53 9.53 0 0 0 .75.73Z"/>
        <path d="M38.09 50.19a7.42 7.42 0 0 1-4.45-2 9.52 9.52 0 0 1-3.11-5.05 1.2 1.2 0 0 1 .26-1 1.41 1.41 0 0 1 1.13-.51h12.34a1.44 1.44 0 0 1 1.13.51 1.19 1.19 0 0 1 .25 1 9.52 9.52 0 0 1-3.11 5.05 7.42 7.42 0 0 1-4.44 2Zm-6.17-7.4c-.16 0-.2.07-.21.09a8.29 8.29 0 0 0 2.73 4.37A6.23 6.23 0 0 0 38.09 49a6.28 6.28 0 0 0 3.65-1.73 8.3 8.3 0 0 0 2.72-4.37.21.21 0 0 0-.2-.09Z"/>
      </g>
      <g>
        <ellipse cx="53.22" cy="40.18" rx="5.85" ry="3.44" fill="#febbd0"/>
        <ellipse cx="22.95" cy="40.18" rx="5.85" ry="3.44" fill="#febbd0"/>
        <path d="M25.7 38.8a5.51 5.51 0 1 0-5.5-5.51 5.51 5.51 0 0 0 5.5 5.51Zm24.77 0A5.51 5.51 0 1 0 45 33.29a5.5 5.5 0 0 0 5.47 5.51Z" fillRule="evenodd"/>
        <path d="M24 33.64a2.07 2.07 0 1 0-2.06-2.07A2.07 2.07 0 0 0 24 33.64Zm24.77 0a2.07 2.07 0 1 0-2.06-2.07 2.07 2.07 0 0 0 2.04 2.07Z" fill="#fff" fillRule="evenodd"/>
      </g>
    </svg>
  ),
}

type IconKey = keyof typeof icons

interface SystemModule {
  id: string
  name: string
  version: string
  icon: IconKey
  category: "CORE" | "RUNTIME" | "DATA" | "DEPLOY" | "TOOLS"
  status: "ACTIVE" | "STANDBY" | "OFFLINE"
  load?: number // 0-100 percentage
}

const systemModules: SystemModule[] = [
  { id: "MOD-001", name: "TYPESCRIPT", version: "v5.x", icon: "typescript", category: "CORE", status: "ACTIVE", load: 95 },
  { id: "MOD-002", name: "REACT", version: "v19.x", icon: "react", category: "CORE", status: "ACTIVE", load: 88 },
  { id: "MOD-003", name: "NEXT.JS", version: "v16.x", icon: "nextjs", category: "CORE", status: "ACTIVE", load: 92 },
  { id: "MOD-004", name: "NODE.JS", version: "v22.x", icon: "nodejs", category: "RUNTIME", status: "ACTIVE", load: 75 },
  { id: "MOD-005", name: "BUN", version: "v1.x", icon: "bun", category: "RUNTIME", status: "ACTIVE", load: 85 },
  { id: "MOD-006", name: "TAILWIND", version: "v4.x", icon: "tailwindcss", category: "CORE", status: "ACTIVE", load: 90 },
  { id: "MOD-007", name: "POSTGRESQL", version: "v16.x", icon: "postgresql", category: "DATA", status: "ACTIVE", load: 60 },
  { id: "MOD-008", name: "PRISMA", version: "v6.x", icon: "prisma", category: "DATA", status: "ACTIVE", load: 55 },
  { id: "MOD-009", name: "DOCKER", version: "v27.x", icon: "docker", category: "DEPLOY", status: "STANDBY", load: 30 },
  { id: "MOD-010", name: "VERCEL", version: "EDGE", icon: "vercel", category: "DEPLOY", status: "ACTIVE", load: 70 },
  { id: "MOD-011", name: "GIT", version: "v2.x", icon: "git", category: "TOOLS", status: "ACTIVE", load: 65 },
  { id: "MOD-012", name: "FIGMA", version: "WEB", icon: "figma", category: "TOOLS", status: "STANDBY", load: 20 },
]

function ModuleCard({ module, index }: { module: SystemModule; index: number }) {
  const Icon = icons[module.icon]
  const [isHovered, setIsHovered] = React.useState(false)

  const statusColor = {
    ACTIVE: "var(--term-success)",
    STANDBY: "var(--term-warning)",
    OFFLINE: "var(--term-error)",
  }[module.status]

  const statusType = {
    ACTIVE: "online" as const,
    STANDBY: "warning" as const,
    OFFLINE: "offline" as const,
  }[module.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative border border-[var(--term-border)] bg-[var(--term-bg-card)]",
        "transition-all duration-300",
        "hover:border-[var(--term-green)] hover:shadow-[0_0_15px_var(--term-green-subtle)]"
      )}
    >
      {/* Module header */}
      <div className="flex items-center justify-between border-b border-[var(--term-border)] px-3 py-2">
        <span className="font-mono text-[10px] text-[var(--term-text-muted)]">{module.id}</span>
        <div className="flex items-center gap-1.5">
          <StatusDot status={statusType} />
          <span className="text-[10px]" style={{ color: statusColor }}>
            {module.status}
          </span>
        </div>
      </div>

      {/* Module content */}
      <div className="p-4">
        {/* Icon and name */}
        <div className="flex items-center gap-3">
          <div className={cn(
            "relative flex size-10 items-center justify-center border border-[var(--term-border)] bg-[var(--term-bg-elevated)] p-2",
            "transition-all duration-300",
            isHovered && "border-[var(--term-green)] shadow-[0_0_10px_var(--term-green-subtle)]"
          )}>
            <Icon />
            {/* Scanlines on icon */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  transparent 2px,
                  rgba(0, 255, 65, 0.1) 2px,
                  rgba(0, 255, 65, 0.1) 4px
                )`,
              }}
            />
          </div>
          <div>
            <h4 className={cn(
              "text-sm font-semibold tracking-wide transition-colors",
              isHovered ? "text-[var(--term-green)]" : "text-[var(--term-text)]"
            )}>
              {module.name}
            </h4>
            <span className="text-xs text-[var(--term-cyan)]">{module.version}</span>
          </div>
        </div>

        {/* Load bar */}
        {module.load !== undefined && (
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[10px]">
              <span className="text-[var(--term-text-muted)]">LOAD</span>
              <span className="text-[var(--term-text)]">{module.load}%</span>
            </div>
            <div className="h-1 w-full overflow-hidden bg-[var(--term-border)]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${module.load}%` }}
                transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                viewport={{ once: true }}
                className={cn(
                  "h-full",
                  module.load > 80 ? "bg-[var(--term-success)]" :
                  module.load > 50 ? "bg-[var(--term-cyan)]" :
                  "bg-[var(--term-text-muted)]"
                )}
              />
            </div>
          </div>
        )}
      </div>

      {/* Hover glow */}
      <motion.div
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="pointer-events-none absolute inset-0 border border-[var(--term-green)]"
        style={{
          boxShadow: "inset 0 0 20px var(--term-green-subtle)",
        }}
      />
    </motion.div>
  )
}

function SystemLoadBar() {
  const [load, setLoad] = React.useState(0)
  const targetLoad = 72

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLoad((prev) => {
        if (prev >= targetLoad) return targetLoad
        return prev + 2
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="border border-[var(--term-border)] bg-[var(--term-bg-elevated)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[var(--term-cyan)]\">█</span>
          <span className="uppercase tracking-widest text-[var(--term-text-muted)]">
            SYSTEM_LOAD
          </span>
        </div>
        <span className="font-mono text-sm text-[var(--term-green)]">{load}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden bg-[var(--term-bg)]">
        <motion.div
          className="flex h-full"
          initial={{ width: 0 }}
          animate={{ width: `${load}%` }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated blocks */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "mr-0.5 h-full flex-1",
                i < (load / 100) * 20 ? "bg-[var(--term-green)]" : "bg-transparent"
              )}
              style={{
                animation: i < (load / 100) * 20 ? `pulse 1s ease-in-out ${i * 0.05}s infinite` : undefined,
              }}
            />
          ))}
        </motion.div>
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-[var(--term-text-muted)]">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  )
}

export function TechStackSection() {
  const categories = ["CORE", "RUNTIME", "DATA", "DEPLOY", "TOOLS"] as const

  return (
    <section className="relative px-4 py-16 font-[family-name:var(--font-ibm-plex-mono)] md:px-8 md:py-24 lg:px-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="border border-[var(--term-border)] bg-[var(--term-bg-elevated)]">
          {/* Atari stripe */}
          <AtariStripe />

          {/* Header bar */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-lg text-[var(--term-cyan)]">▓▓</span>
              <span className="text-sm text-[var(--term-text)] md:text-base">
                SYSTEM SPECIFICATIONS
              </span>
              <span className="text-lg text-[var(--term-cyan)]">▓▓</span>
            </div>
            <span className="hidden text-xs text-[var(--term-text-muted)] md:inline">
              REV 4.2
            </span>
          </div>
        </div>
      </motion.div>

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
        className="mb-8 space-y-2"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--term-green-dim)]">
          {">"} INSTALLED_MODULES
        </p>
        <h2 className="text-2xl font-bold text-[var(--term-text)] md:text-3xl lg:text-4xl">
          TECH_STACK
        </h2>
        <p className="max-w-lg text-sm text-[var(--term-text-muted)]">
          Core systems and peripherals powering all operations. All modules verified and operational.
        </p>
      </motion.div>

      {/* System Load Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <SystemLoadBar />
      </motion.div>

      {/* Module Categories */}
      {categories.map((category, categoryIndex) => {
        const categoryModules = systemModules.filter((m) => m.category === category)
        if (categoryModules.length === 0) return null

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            {/* Category header */}
            <div className="mb-4 flex items-center gap-4">
              <span className={cn(
                "text-xs uppercase tracking-widest",
                category === "CORE" && "text-[var(--term-green)]",
                category === "RUNTIME" && "text-[var(--term-cyan)]",
                category === "DATA" && "text-[var(--term-magenta)]",
                category === "DEPLOY" && "text-[var(--term-amber)]",
                category === "TOOLS" && "text-[var(--term-text-muted)]"
              )}>
                █ {category}_SYSTEMS
              </span>
              <div className="h-px flex-1 bg-[var(--term-border)]" />
              <span className="text-[10px] text-[var(--term-text-dim)]">
                {categoryModules.length} MODULE{categoryModules.length > 1 ? "S" : ""}
              </span>
            </div>

            {/* Modules grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryModules.map((module, index) => (
                <ModuleCard key={module.id} module={module} index={index} />
              ))}
            </div>
          </motion.div>
        )
      })}

      {/* Bottom decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 flex items-center justify-center gap-4 text-xs text-[var(--term-text-dim)]"
      >
        <span>─────────────</span>
        <span>ALL_SYSTEMS_NOMINAL</span>
        <span>─────────────</span>
      </motion.div>

      {/* Decorative corner elements */}
      <div className="pointer-events-none absolute left-4 top-4 text-[var(--term-border)] md:left-8 md:top-8">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M1 1 L1 8 M1 1 L8 1" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 text-[var(--term-border)] md:bottom-8 md:right-8">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M19 19 L19 12 M19 19 L12 19" />
        </svg>
      </div>
    </section>
  )
}
