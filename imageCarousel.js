import { LitElement, html } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map'
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';

import * as Gestures from '@polymer/polymer/lib/utils/gestures';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';

export class imageCarousel extends GestureEventListeners(LitElement) {

    static get properties() {
        return {
            imageList: Array,
            openModal: { type: Boolean }
        };
    }

    constructor() {
        super();
        this.slideIndex = 1;
        this.openModal = false;
        this.currentIndex = 0;
    }

    firstUpdated(changedProperties) {
        Gestures.addListener(this.shadowRoot.querySelector(".imagecard"), 'track', this.handleTrack.bind(this));
        // Let browser handle vertical scrolling and zoom
        Gestures.setTouchAction(this.shadowRoot.querySelector(".imagecard"), 'pan-y pinch-zoom');
    }

    nextImage(n) {
        this.showImage(this.slideIndex += n);
    }

    showImage(n) {
        let i;
        let x = this.shadowRoot.querySelectorAll('.image-holder');
        this.slideIndex = n;
        if (n > x.length) { this.slideIndex = 1 }
        if (n < 1) { this.slideIndex = x.length }
        for (i = 0; i < x.length; i++) {
            x[i].classList.remove('show-image');
            x[i].classList.add('hide-image');
        }
        x[this.slideIndex - 1].classList.remove('hide-image');
        x[this.slideIndex - 1].classList.add('show-image');
    }

    toggleModal(index) {
        this.openModal = !this.openModal;
        if (this.openModal) {
            this.currentIndex = index + 1;
            this.showImage(this.currentIndex);
        }
    }

    handleTrack(e) {
        switch (e.detail.state) {
            case 'track':
                if (e.detail.ddx > 20) {
                    console.log('Swiped right');
                    this.nextImage(-1);
                }
                if (e.detail.ddx < -20) {
                    console.log('Swiped LEFT');
                    this.nextImage(1);
                }
                break;
        }
    }

    render() {
        console.log('List inside lit element: ', JSON.parse(this.imageList));
        let parsedImageList = JSON.parse(this.imageList);
        return html`
         <style>
            .image-thumbnail {
                height: 200px;
                flex-grow: 1;
                margin: 2px;
                cursor: pointer;
                transition: all .5s ease;
            }
            .image-thumbnail:hover {
                transform: scale(1.01);
            }
            .image-holder { 
                transition: all .5s ease;
            }
            .show-image {
                height: auto;
                padding: 0 8px;
                margin-bottom: 32px; 
                visibility: visible;
                opacity: 1;
                border: 1px solid black;
            }
            .hide-image {
                height: 0px;
                padding: 0px;
                margin-bottom: 0px; 
                visibility: hidden;
                opacity: 0;
                border: none;
            }
            .image-header {
                display: flex;
                align-items: center;
                padding: 8px 0;
            }
            .image-with-arrow{
                display: flex;
                align-items: center;
            }
            .image-item {
                width: 100%;
                height: auto;
            }
            .opened {
                display: flex;
                flex-wrap: wrap;
                visibility: visible;
                opacity: 1;
                transition: visibility 1s ease, opacity 1s ease;
            }
            .closed {
                opacity:0;
                visibility: hidden;
                height: 0;
            }
            .icon-close {
                margin-left: auto;
            }
            .pointer {
                cursor: pointer;
            }
            .arrow {
                border: solid black;
                border-width: 0 4px 4px 0;
                display: inline-block;
                padding: 8px;
                position: absolute;
                transition: all .5s ease;
            }
            .arrow:hover {
                padding: 9px;
            }
            .right {
                right: 24px;
                transform: rotate(-45deg);
                -webkit-transform: rotate(-45deg);
            }
            .left {
                left: 24px;
                transform: rotate(135deg);
                -webkit-transform: rotate(135deg);
            }
        </style>
        <div class="${classMap({ opened: !this.openModal, closed: this.openModal })}">
            ${parsedImageList.map((item, index) => html`<img class="image-thumbnail" src="${item.filePath}" @click="${this.toggleModal.bind(this, index)}">`)}
        </div>
        <div class="${classMap({ imagecard: true, opened: this.openModal, closed: !this.openModal })}">
            ${parsedImageList.map(item => html`<div class='image-holder'>
                <div class="image-header">
                    <span>${item.title}</span>
                    <iron-icon class="icon-close pointer" icon="close" @click="${this.toggleModal.bind(this, 0)}"></iron-icon>
                </div>
                <div class="image-with-arrow">
                    <i class="pointer arrow left" @click="${() => this.nextImage(-1)}"></i>
                    <img class="image-item" src="${item.filePath}">
                    <i class="pointer arrow right" @click="${() => this.nextImage(1)}"></i>
                </div>
                <p>${item.description}</p>
            </div>`)}
        </div> 
        `
    }
}

customElements.define('image-carousel', imageCarousel);