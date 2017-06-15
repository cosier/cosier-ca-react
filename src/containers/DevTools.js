import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
let tools = null
if (__DEV__) {
  tools = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-1'
                defaultIsVisible={false}
                changePositionKey='ctrl-2'
                changeMonitorKey='ctrl-3'>
      <LogMonitor />
      <SliderMonitor />
    </DockMonitor>
  );
} else {
  tools = ()=> { return null; }
}

export default tools
