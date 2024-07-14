import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { NativeDateAdapter } from "@angular/material/core";

export class CustomDateAdapter extends MomentDateAdapter {
    override getDayOfWeekNames(style: 'long' | 'short' | 'narrow') {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }
}

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: "DD-MMM-YYYY"
    },
    display: {
        dateInput: "DD-MMM-YYYY",
        monthYearLabel: "MMMM YYYY",
        dateA11yLabel: "DD-MMM-YYYY",
        monthYearA11yLabel: "MMMM YYYY"
    }
};