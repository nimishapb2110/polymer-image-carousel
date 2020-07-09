# polymer-image-carousel

    An image slider web component created using litElement base class. Designed for mobile devices, with swipe feature to switch images.

    The component can be used as below:
    <image-carousel imageList="##sample_list##"></image-carousel>

    Only input expected to use this web component is 'imageList' - An example of expected list ##sample_list##:

    JSON.stringify([
        {
            "description": "A brief description about this specific image goes here.",
            "filePath": "https://images.unsplash.com/photo-1594026766321-bf97f783182c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
            "title": "First image title",
            "_id": "1"
        },
        {
            "description": "Another description - about second image!",
            "fil    ePath": "https://images.unsplash.com/photo-1594034327898-806233778484?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
            "title": "Second image title",
            "_id": "2"
        },
        {
            "description": "Another description - about third image!",
            "filePath": "https://images.unsplash.com/photo-1593627906979-dc2fdc503e32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
            "title": "Third image title",
            "_id": "3"
        },
        {
            "description": "Another description - about fourth image!",
            "filePath": "https://images.unsplash.com/photo-1594225258155-d1442fa3f82d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
            "title": "Fourth image title",
            "_id": "4"
        }
        ])
    
    The component will initially list all the images in the list in an overview layout. 
    On clicking any image, it opens up to full view, which can now be swiped left/right for other images. User can come back to overview by closing the image modal.
    
    This can be used from the npm registry: 
    npm i @nimishapb2110/image-carousel 
