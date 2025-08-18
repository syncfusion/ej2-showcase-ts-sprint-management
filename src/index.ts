/**
 *  Index page handler
 */
import * as hasher from 'hasher';
import crossroads from 'crossroads';
import { Ajax } from '@syncfusion/ej2-base';
import '../styles/styles.scss';
import '../styles/index.scss';
import './home/homePage';
let pages: Object[] = [
    { root: 'home', page: 'homePage' }
];

export interface IPages extends Window {
    sprintData2: ({ Id: number; Subject: string; Status: string; StartTime: string; EndTime: string; Priority: string; Progress: number; resources: { resourceId: number; resourceName: string; }[]; Tags: string; Predecessor?: undefined; } | { Id: number; Subject: string; Status: string; StartTime: string; EndTime: string; Priority: string; Progress: number; resources: { resourceId: number; resourceName: string; }[]; Tags: string; Predecessor: number; })[];
    sprintData3: ({ Id: number; Subject: string; Status: string; StartTime: string; EndTime: string; Priority: string; Progress: number; resources: { resourceId: number; resourceName: string; }[]; Tags: string; Predecessor?: undefined; } | { Id: number; Subject: string; Status: string; StartTime: string; EndTime: string; Priority: string; Progress: number; resources: { resourceId: number; resourceName: string; }[]; Tags: string; Predecessor: number; })[];
    commonData: ({ Id: number; Subject: string; Status: string; StartTime: string; EndTime: string; resources: { resourceId: number; resourceName: string; }[]; Priority: string; Tags: string; Progress: number; Predecessor?: undefined; } | { Id: number; Subject: string; Status: string; StartTime: string; EndTime: string; resources: { resourceId: number; resourceName: string; }[]; Priority: string; Tags: string; Progress: number; Predecessor: number; })[];
    sprintData1: ({ Id: number; Subject: string; Status: string; StartTime: string; EndTime: string; resources: { resourceId: number; resourceName: string; }[]; Priority: string; Tags: string; Progress: number; Predecessor?: undefined; } | { Id: number; Subject: string; Status: string; StartTime: string; EndTime: string; resources: { resourceId: number; resourceName: string; }[]; Priority: string; Tags: string; Progress: number; Predecessor: number; })[];
    // All route pages declared here.
    home: () => void;
}

declare let window: IPages;

routeDefault(); // Initiate default routing function

function routeDefault(): void {
    crossroads.addRoute('', () => {
        window.location.href = '#/home'; // At initial page load href value updated as `home` for route.
    });
}

crossroads.addRoute('/{val}', () => {
    let pageObj: { [key: string]: Object } = getPageObj(window.location.hash.replace('#/', ''));
    let ajaxHTML: Ajax = new Ajax('./' + pageObj.page + '.html', 'GET', true);
    ajaxHTML.send().then((value: Object): void => {
        document.body.innerHTML = value.toString();
        if (window.location.hash.replace('#/', '') === 'home') {
            window.home();
        }
    })
    .catch((error: any) => {
        // Handle any potential Promise rejections
        console.error('An error occurred:', error);
      });
});

function getPageObj(page: string): { [key: string]: Object } {
    let pageObj: { [key: string]: Object } = {};
    pages.forEach((item: any) => {
        if (item.root === page) {
            pageObj = item;
        }
    });
    return pageObj;
}

// Window location hash handlers
hasher.initialized.add((hashValue: string) => {
    crossroads.parse(hashValue); // Page initial loading state this function calls '' route handler.
});

hasher.changed.add((hashValue: string) => {
    crossroads.parse(hashValue); // When location hash changed this function calls `home` route handler.
});
hasher.init(); // Initiate the hasher function

export interface IPages extends Window {
    default: () => void;
    destroy: () => void;
    getDataState: () => DataSketch;
}
export interface DataSketch {
    dataUnits: [object];
    yearWiseData: [object];
}