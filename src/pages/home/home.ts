import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {

    public feeds: Array<string>;
    private url: string = "https://www.reddit.com/new.json";  

    constructor(
        public navCtrl: NavController,
        public http: Http,
        public loadingCtrl: LoadingController,
        private inAppBrowser: InAppBrowser ) {
        this.fetchContent();
    }

    fetchContent():void {
        let loading = this.loadingCtrl.create({content: "Fetching content..."});
        loading.present();
        this.http.get(this.url).map(res => res.json()).subscribe(data => {
            this.feeds = data.data.children;
            loading.dismiss();
        });
    }

    itemSelected (url: string):void {
        this.inAppBrowser.create(url, "_self", "location=false");
    }
}
