/**
 * @prettier
 * @flow
 * */

import React from 'react'
import { requireNativeComponent, PickerIOS, Picker, Text } from 'react-native'

type Props = {
  data: Array<string>,
  selectedItem?: number,
  onItemSelected?: number => void
}

type State = {
  selectedItem: number
}

export default class WheelPicker extends React.Component<Props, State> {
  static defaultProps = {
    style: {
      width: 200,
      height: 150,
    },
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      selectedItem: props.selectedItem
    }
    this.style = {
      // ios与android统一使用itemTextColor,itemTextSizes来设置文本样式
      color: props.itemTextColor,
      fontSize: props.itemTextSizes,
      fontFamily: props.itemTextFontFamily
    }

  }
  //  在组件完成更新后立即调用。在ios上用于更新当前用户选中项的selectedItem值
  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.selectedItem !== this.props.selectedItem) {
      this.setState({ selectedItem: this.props.selectedItem })
    }
  }

  onItemSelected = (value: any, index: number) => {
    if (this.props.onItemSelected) {
      this.props.onItemSelected(index)
    }
    this.setState({ selectedItem: index })
  }

  render() {
    const data = this.props.data
    if (!data || !data.length < 0) return null
    return (
      <Picker
      {...this.props}
        itemStyle={this.style}
        selectedValue={data[this.state.selectedItem]}
      onValueChange={this.onItemSelected}>
      {this.props.data.map((i, index) => <Picker.Item key={index} label={i} value={i} />)}
    </Picker>
    )
  }
}
