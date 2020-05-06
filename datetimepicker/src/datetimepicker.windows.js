/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 * @format
 */
'use strict';

import {requireNativeComponent, StyleSheet} from 'react-native';
import {WindowsNativeProps, WindowsDatePickerChangeEvent} from './types';
import * as React from 'react';

const styles = StyleSheet.create({
  rnDatePicker: {
    height: 32,
    width: 150,
  },
});

const RNDateTimePickerWindows = requireNativeComponent('RNDateTimePickerWindows');

export default class DateTimePickerWindows extends React.Component<WindowsNativeProps> {
  static defaultProps: WindowsNativeProps = {
    dateFormat: 'dayofweek day month',
  };

  // tslint:disable-next-line:no-any
  _rnDatePicker: any;

  constructor(props: WindowsNativeProps) {
    super(props);
    this._rnDatePicker = React.createRef();
  }
  render(): JSX.Element {
    const props = {
      dayOfWeekFormat: this.props.dayOfWeekFormat,
      dateFormat: this.props.dateFormat,
      firstDayOfWeek: this.props.firstDayOfWeek,
      maxDate: this.props.maxDate ? this.props.maxDate.getTime() : undefined, // time in milliseconds
      minDate: this.props.minDate ? this.props.minDate.getTime() : undefined, // time in milliseconds
      onChange: this.props.onChange,
      placeholderText: this.props.placeholderText,
      selectedDate: this.props.value
        ? this.props.value.getTime()
        : undefined, // time in milliseconds
      style: [styles.rnDatePicker, this.props.style],
    };

    // The Date object returns timezone in minutes. Convert that to seconds
    // and multiply by -1 so that the offset can be added to GMT time to get
    // the correct value on the native side.
    const timeZoneOffsetInSeconds = this.props.timeZoneOffsetInSeconds
      ? this.props.timeZoneOffsetInSeconds
      : this.props.value
      ? -1 * this.props.value.getTimezoneOffset() * 60
      : undefined;

    return (
      <RNDateTimePickerWindows
        {...props}
        onChange={this._onChange}
        ref={this._setRef}
        timeZoneOffsetInSeconds={timeZoneOffsetInSeconds}
      />
    );
  }

  _setRef = (datepicker: DateTimePickerWindows /*DateTimePickerWindows*/) => {
    this._rnDatePicker = datepicker;
  };

  _onChange = (event: WindowsDatePickerChangeEvent) => {
    if (this.props.selectedDate) {
      const propsTimeStamp = this.props.selectedDate.getTime();
      if (this._rnDatePicker) {
        this._rnDatePicker.setNativeProps({selectedDate: propsTimeStamp});
      }
    }

    // Change the props after the native props are set in case the props
    // change removes the component
    this.props.onChange && this.props.onChange(event);

    const nativeTimeStamp = event.nativeEvent.newDate;
    this.props.onDateChange &&
      this.props.onDateChange(new Date(+nativeTimeStamp)); // Added the '+' operator to convert string to number
  };
}
