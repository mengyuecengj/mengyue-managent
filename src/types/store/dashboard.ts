export interface DashboardBlock {
  id: string
  type: string
  config: any

  rendererType?: 'chart' | 'border' | 'text' | 'map'

  component?: any

  x: number
  y: number
  width: string
  height: string
  zIndex: number

  // 图层基础属性
  name: string
  visible: boolean
  color: string
  widthX: number
  title: boolean
  titleText: string
  titleColor: string
  fontWeight: string
  fontSize: number
  content: string
  xAlign: boolean
  xName: string
  xVisible: boolean
  splitLine: boolean
  splitLineColor: string
  xmove: number | string
  xRotate: number | string
  xInverse: boolean
  xDataSize: number | string
  yAlign: boolean,
  yName: string
  yVisible: boolean
  ySplitLine: boolean
  ySplitLineColor: string
  yInverse: boolean
  yDataSize: number
  dataSettingAlign: boolean
  dataAlign: boolean
  dataSize: number
  dataSizeColor: string
  dataWeight: number
  MPAlign: boolean
  MPTop: number | string
  MPBottom: number | string
  MPLeft: number | string
  MPRight: number | string
  borderName: string
  borderMasterColor: string
  borderSlaveColor: string
  backgroundColor: string
  textName: string
  textVisible: boolean
  textContainer: string
  textColor: string
  textSize: string | number
  textWeight: string | number

  // 地图
  mapSetting: boolean
  mapScale: number
  mapNameVisible: boolean
  mapNameSize: string | number
  mapNameColor: string
  mapNameColorHover: string
  mapBorderWidth: number
  mapBorderColor: string
  mapAreaColor: string
  mapAreaColorHover: string
  LeftRightPadding: number
  TopBottomPadding: number
}
