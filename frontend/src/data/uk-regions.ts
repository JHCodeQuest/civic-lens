export interface UkRegionShape {
  id: string
  label: string
  path: string
  cx: number
  cy: number
}

// Simplified SVG paths for UK regions (abstracted positions)
export const UK_REGIONS: UkRegionShape[] = [
  {
    id: "Scotland",
    label: "Scotland",
    path: "M 180,10 L 280,10 L 290,40 L 300,60 L 310,80 L 320,100 L 330,120 L 300,130 L 270,125 L 240,120 L 210,115 L 190,110 L 175,100 L 160,80 L 155,60 L 160,30 Z",
    cx: 245, cy: 70,
  },
  {
    id: "Northern Ireland",
    label: "Northern Ireland",
    path: "M 20,110 L 60,105 L 90,115 L 100,130 L 95,145 L 70,150 L 40,148 L 25,140 L 18,125 Z",
    cx: 55, cy: 128,
  },
  {
    id: "North East",
    label: "North East",
    path: "M 290,135 L 310,130 L 325,145 L 330,165 L 320,180 L 305,185 L 290,180 L 282,165 L 285,145 Z",
    cx: 307, cy: 158,
  },
  {
    id: "North West",
    label: "North West",
    path: "M 190,140 L 220,135 L 250,140 L 265,155 L 270,175 L 260,190 L 235,195 L 210,190 L 195,180 L 188,165 L 185,150 Z",
    cx: 228, cy: 165,
  },
  {
    id: "Yorkshire and the Humber",
    label: "Yorkshire & Humber",
    path: "M 270,160 L 290,155 L 300,170 L 305,190 L 295,205 L 275,210 L 260,205 L 258,185 L 262,170 Z",
    cx: 280, cy: 182,
  },
  {
    id: "East Midlands",
    label: "East Midlands",
    path: "M 260,210 L 290,208 L 315,215 L 325,235 L 315,250 L 290,255 L 265,250 L 255,235 L 255,218 Z",
    cx: 289, cy: 232,
  },
  {
    id: "West Midlands",
    label: "West Midlands",
    path: "M 210,210 L 240,205 L 258,215 L 260,240 L 248,255 L 225,260 L 205,252 L 198,235 L 200,218 Z",
    cx: 230, cy: 233,
  },
  {
    id: "Wales",
    label: "Wales",
    path: "M 180,215 L 205,210 L 210,235 L 208,260 L 195,275 L 175,278 L 162,265 L 160,245 L 168,225 Z",
    cx: 186, cy: 246,
  },
  {
    id: "East of England",
    label: "East of England",
    path: "M 295,260 L 330,255 L 350,270 L 360,300 L 350,320 L 325,325 L 305,315 L 290,295 L 288,275 Z",
    cx: 325, cy: 290,
  },
  {
    id: "London",
    label: "London",
    path: "M 280,300 L 305,295 L 320,305 L 318,325 L 300,335 L 282,328 L 275,312 Z",
    cx: 298, cy: 315,
  },
  {
    id: "South East",
    label: "South East",
    path: "M 250,310 L 280,305 L 285,330 L 290,355 L 270,370 L 245,365 L 235,345 L 238,325 Z",
    cx: 264, cy: 340,
  },
  {
    id: "South West",
    label: "South West",
    path: "M 120,280 L 170,275 L 195,290 L 200,320 L 190,345 L 165,355 L 135,350 L 115,335 L 108,310 L 112,290 Z",
    cx: 156, cy: 315,
  },
]
