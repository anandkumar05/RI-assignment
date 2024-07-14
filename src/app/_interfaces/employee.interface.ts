export interface IEMPLOYEE {
    id: string,
    name: string,
    role: 'PO' | 'PD' | 'FD' | 'QA',
    joinDate: string,
    relieveDate?: string
}