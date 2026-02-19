export interface DataClassification {
  sensitiveData: SensitiveDataTypes;
  dataTypes: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface SensitiveDataTypes {
  pii?: PersonallyIdentifiableInfo;
  phi?: ProtectedHealthInfo;
  pci?: PaymentCardInfo;
  intellectual?: IntellectualProperty;
}

export interface PersonallyIdentifiableInfo {
  found: boolean;
  types: string[];
  count: number;
}

export interface ProtectedHealthInfo {
  found: boolean;
  types: string[];
  count: number;
}

export interface PaymentCardInfo {
  found: boolean;
  types: string[];
  count: number;
}

export interface IntellectualProperty {
  found: boolean;
  types: string[];
  count: number;
}