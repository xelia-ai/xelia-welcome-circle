
import React from 'react';

// This file already exists with ROI types, so we'll add the Tip interface
export interface Tip {
  id: string;
  text: string;
  iconName: string;
  capabilities: string[];
}
