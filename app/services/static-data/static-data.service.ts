export interface NavBarDataItem {
    label: string;
    path: string;
}
export interface StaticData { navBar: NavBarDataItem[]; }
export type StaticDataKey = "navMenu";
export type StaticDataItem = NavBarDataItem[];
export interface StaticDataService { (data: StaticDataKey): StaticDataItem; }

export function staticDataService(STATIC: StaticData) {
    return (data: StaticDataKey) => {
        return STATIC[data];
    };
}
