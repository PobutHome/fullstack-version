import clsx from 'clsx'
import React from 'react'

export function SpeedIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="205"
      height="170"
      viewBox="0 0 205 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx(props.className)}
    >
      <mask
        id="mask0_1_4996"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="26"
        width="179"
        height="143"
      >
        <path
          d="M23.4095 163.181C20.6481 163.181 17.9787 161.8 16.598 159.407C9.23419 147.073 5 132.621 5 117.157C5 71.4098 42.0951 34.3147 87.8427 34.3147C133.59 34.3147 170.685 71.4098 170.685 117.157C170.685 132.621 166.451 147.073 159.087 159.407C157.707 161.8 155.037 163.181 152.276 163.181H23.4095Z"
          stroke="white"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M113.878 143.192C99.4934 157.577 76.1922 157.577 61.8078 143.192C47.4235 128.808 47.4235 105.507 61.8078 91.1223C76.1922 76.738 178.965 26.035 178.965 26.035C178.965 26.035 128.262 128.808 113.878 143.192Z"
          fill="black"
        />
        <path
          d="M100.86 130.175C93.7001 137.334 81.9843 137.334 74.8247 130.175C67.6651 123.015 67.6651 111.299 74.8247 104.14C81.9843 96.9803 152.93 52.07 152.93 52.07C152.93 52.07 108.019 123.015 100.86 130.175Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_1_4996)">
        <path
          d="M198.3 -11.7092H-22.6143V209.205H198.3V-11.7092Z"
          fill="var(--sys-accent, #72CB1A)"
        />
      </g>
    </svg>
  )
}

