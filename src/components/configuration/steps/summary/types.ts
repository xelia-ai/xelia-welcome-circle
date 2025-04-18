
export interface CapabilitySummaryProps {
  capabilities: string[];
  capabilityNames: Record<string, string>;
  callsVolume: string;
  onEdit: () => void;
}

export interface VolumeDisplayProps {
  callsVolume: string;
}

export interface CapabilityItemProps {
  capabilityId: string;
  name: string;
}
