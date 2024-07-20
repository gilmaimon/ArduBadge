package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/stats/recent", func(w http.ResponseWriter, r *http.Request) {
		log.Println("Hello Recent!")
		json := `[
    {
        "name": "MockLibrary1",
        "version": "1.0.0",
        "author": "John Doe <john.doe@example.com>",
        "website": "https://example.com/MockLibrary1"
    },
    {
        "name": "MockLibrary2",
        "version": "2.1.3",
        "author": "Jane Smith <jane.smith@example.com>",
        "website": "https://example.com/MockLibrary2"
    },
    {
        "name": "MockLibrary3",
        "version": "0.9.8",
        "author": "Alice Johnson <alice.johnson@example.com>",
        "website": "https://example.com/MockLibrary3"
    },
    {
        "name": "MockLibrary4",
        "version": "1.2.4",
        "author": "Bob Brown <bob.brown@example.com>",
        "website": "https://example.com/MockLibrary4"
    },
    {
        "name": "MockLibrary5",
        "version": "3.5.2",
        "author": "Charlie Davis <charlie.davis@example.com>",
        "website": "https://example.com/MockLibrary5"
    },
    {
        "name": "MockLibrary6",
        "version": "1.0.0",
        "author": "David Evans <david.evans@example.com>",
        "website": "https://example.com/MockLibrary6"
    },
    {
        "name": "MockLibrary7",
        "version": "2.0.0",
        "author": "Eve Foster <eve.foster@example.com>",
        "website": "https://example.com/MockLibrary7"
    },
    {
        "name": "MockLibrary8",
        "version": "1.1.1",
        "author": "Frank Green <frank.green@example.com>",
        "website": "https://example.com/MockLibrary8"
    },
    {
        "name": "MockLibrary9",
        "version": "0.5.0",
        "author": "Grace Harris <grace.harris@example.com>",
        "website": "https://example.com/MockLibrary9"
    },
    {
        "name": "MockLibrary10",
        "version": "2.3.1",
        "author": "Henry Ivory <henry.ivory@example.com>",
        "website": "https://example.com/MockLibrary10"
    }
]`

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(json))
	})

	http.HandleFunc("/library/", func(w http.ResponseWriter, r *http.Request) {
		log.Println("Hello Library!")
		json := `{
    "data": {
        "architectures": [
            "*"
        ],
        "types": [
            "Contributed"
        ],
        "name": "MockLibrary",
        "version": "1.0.0",
        "__v": 0,
        "author": "Mock Author",
        "category": "Utilities",
        "checksum": "SHA-256:mockchecksum1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
        "isLatest": true,
        "maintainer": "Mock Maintainer",
        "paragraph": "This is a mock library for demonstration purposes.",
        "repository": "https://example.com/mocklibrary.git",
        "sentence": "A mock library for testing.",
        "size": 1234567,
        "url": "https://example.com/mocklibrary.zip",
        "website": "https://example.com"
    },
    "found": true
}`

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(json))
	})

	http.HandleFunc("/badge/", func(w http.ResponseWriter, r *http.Request) {
		log.Println("Hello Badge!")
		w.Header().Set("Content-Type", "image/svg+xml")

		svg := `<svg width="184.4" height="20" viewBox="0 0 1844 200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <linearGradient id="a" x2="0" y2="100%">
    <stop offset="0" stop-opacity=".1" stop-color="#EEE"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="m"><rect width="1844" height="200" rx="30" fill="#FFF"/></mask>
  <g mask="url(#m)">
    <rect width="1201" height="200" fill="#555"/>
    <rect width="643" height="200" fill="#999" x="1201"/>
    <rect width="1844" height="200" fill="url(#a)"/>
  </g>
  <g fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
    <text x="260" y="148" textLength="901" fill="#000" opacity="0.25">Library Manager</text>
    <text x="250" y="138" textLength="901">Library Manager</text>
    <text x="1256" y="148" textLength="543" fill="#000" opacity="0.25">MyLibrary</text>
    <text x="1246" y="138" textLength="543">MyLibrary</text>
  </g>
  <image x="40" y="35" width="170" height="130" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAA3CAYAAAD6+O8NAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH4wEKDB43az9p7AAAAvhJREFUeNrtW82O2jAQtk0RHGiQckEFqX2BvkHPfZCqfZXtY1TafYBeetu9rkR7Qa3ErQfUleAWkzhIsFJI9pSKUiC245/xar4TQvGMvxmPZ8ZxCEEgEAgEAoFAIBAIt6AmhFRVVUkrpJRCNohvLqzNxGvojkvT9AqKE9py8RYhJpXXEEI8DIfDN5CjwVXUSEfIdrvd2CBACCFRFL2uqqpKkuTaZURAlE19rSQfeSYEHgwaiVpnlmV/QnaGrk4KjYTpaAmNA4VMpK1TQuTATCjL8/wHlYAQ4psrw+o6oyzLUoYL5/zOS11+CUKI77Z16NT6NmUfI0mSa5M6qO7qMlUJqRqjSa9peSZ5yOhiPp1Ry3p8fMxNEPflDFlZMvNTziFFUXw0vUX2+/1IxTiniKmeQdnodUzI/Mchu93uU9OAbrf7BUI1deiAkA43Oec/pXNIEzFXZGyVqzrzP5yL7Pg2dmQEIKBuJy7AoE7MdcJFhzgyZBsZ0+n0rVcD6DQ2s9ns3nYTVmnCtp7lclmZsqNyhJzrFUaj0TuIkeJimxqPx+cqqZtnuWUFjFe6A1/IPtjr9V6e+n8ymdBzoXtm9eygWnE+n+/iOO4TQkgURWQwGPz3zGq1+vt7sVj0TsmJ4/i99m4AsQ8x1ZeYmC/2IQabREjvQ55FDjFh0NCcouSQPM9/h+QMH05pe3OGmtz/DBG6bZMUfZfDbe1HdVZT6Nd0fM6/SbdWDimK4gMEZ9TvNcqyLFV1JUlyG0xikTk22Gw29650yRw/1DcrXb1LP0SapldWdbkgpOuISy94VC4c+ODhdOXmef7VlhNc3DpR0aPjeO0qC2oNr5qIQ537xaQuhHgI0Rk+j3mOoVpwNE56v9/vGWMsFEdAixZVDo2G7nQ6nTbn+xB6BR/Rsl6vf2lFNrSV5ruT9s2BqSrKsuyzLRIuVrJNPZzzu7ayvX57ASXxQuLBTKw22eMLzvnN4RhIZenBZwaN+fL4kwWCQCAQCAQCgUAgVPAEufXCdEfyaK8AAAAASUVORK5CYII="/>
</svg>`

		w.Write([]byte(svg))
	})

	log.Println("Now server is running on port 80")
	err := http.ListenAndServe(":80", nil)
	if err != nil {
		return
	}
}
