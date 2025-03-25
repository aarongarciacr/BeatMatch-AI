try {
  conn = db.getMongo();
  db = conn.getDB("test");
  print("Connected successfully to MongoDB Atlas");

  db.playlists.insertMany([
    {
      name: "Sweat and Smiles: The Happy Workout Mix",
      description:
        "Get ready to sweat and smile with this upbeat playlist featuring Drake, Post Malone, and Lady Gaga!",
      userId: "BeatMatch-AI",
      tracks: [
        {
          uri: "spotify:track:6DCZcSspjsKoFjzjrWoCdn",
          title: "God's Plan",
          artist: "Drake",
          spotifyId: "6DCZcSspjsKoFjzjrWoCdn",
        },
        {
          uri: "spotify:track:21jGcNKet2qwijlDFuPiPb",
          title: "Circles",
          artist: "Post Malone",
          spotifyId: "21jGcNKet2qwijlDFuPiPb",
        },
        {
          uri: "spotify:track:30XU4suKzCeoCK9YFzdufg",
          title: "Born This Way",
          artist: "Lady Gaga",
          spotifyId: "30XU4suKzCeoCK9YFzdufg",
        },
        {
          uri: "spotify:track:3CA9pLiwRIGtUBiMjbZmRw",
          title: "Nice For What",
          artist: "Drake",
          spotifyId: "3CA9pLiwRIGtUBiMjbZmRw",
        },
        {
          uri: "spotify:track:3KkXRkHbMCARz0aVfEt68P",
          title: "Sunflower",
          artist: "Post Malone",
          spotifyId: "3KkXRkHbMCARz0aVfEt68P",
        },
        {
          uri: "spotify:track:5R8dQOPq8haW94K7mgERlO",
          title: "Poker Face",
          artist: "Lady Gaga",
          spotifyId: "5R8dQOPq8haW94K7mgERlO",
        },
        {
          uri: "spotify:track:1zi7xx7UVEFkmKfv06H8x0",
          title: "One Dance",
          artist: "Drake",
          spotifyId: "1zi7xx7UVEFkmKfv06H8x0",
        },
        {
          uri: "spotify:track:3a1lNhkSLSkpJE4MSHpDu9",
          title: "Congratulations",
          artist: "Post Malone",
          spotifyId: "3a1lNhkSLSkpJE4MSHpDu9",
        },
        {
          uri: "spotify:track:0SiywuOBRcynK0uKGWdCnn",
          title: "Bad Romance",
          artist: "Lady Gaga",
          spotifyId: "0SiywuOBRcynK0uKGWdCnn",
        },
        {
          uri: "spotify:track:2G7V7zsVDxg1yRsu7Ew9RJ",
          title: "In My Feelings",
          artist: "Drake",
          spotifyId: "2G7V7zsVDxg1yRsu7Ew9RJ",
        },
        {
          uri: "spotify:track:7dt6x5M1jzdTEt8oCbisTK",
          title: "Better Now",
          artist: "Post Malone",
          spotifyId: "7dt6x5M1jzdTEt8oCbisTK",
        },
        {
          uri: "spotify:track:2x7MyWybabEz6Y6wvHuwGE",
          title: "Just Dance",
          artist: "Lady Gaga",
          spotifyId: "2x7MyWybabEz6Y6wvHuwGE",
        },
        {
          uri: "spotify:track:0wwPcA6wtMf6HUMpIRdeP7",
          title: "Hotline Bling",
          artist: "Drake",
          spotifyId: "0wwPcA6wtMf6HUMpIRdeP7",
        },
        {
          uri: "spotify:track:7xQAfvXzm3AkraOtGPWIZg",
          title: "Wow.",
          artist: "Post Malone",
          spotifyId: "7xQAfvXzm3AkraOtGPWIZg",
        },
        {
          uri: "spotify:track:57F80059mWaWFvWG3tBTbO",
          title: "The Edge of Glory",
          artist: "Lady Gaga",
          spotifyId: "57F80059mWaWFvWG3tBTbO",
        },
      ],
    },
    {
      name: "Love Notes for Study Halls",
      description:
        "A soulful mix to help you focus on your books while your heart sings along.",
      userId: "Beatmatch-AI",
      tracks: [
        {
          uri: "spotify:track:5QO79kh1waicV47BqGRL3g",
          title: "Save Your Tears",
          artist: "The Weeknd",
          spotifyId: "5QO79kh1waicV47BqGRL3g",
        },
        {
          uri: "spotify:track:3Dv1eDb0MEgF93GpLXlucZ",
          title: "Say So",
          artist: "Doja Cat",
          spotifyId: "3Dv1eDb0MEgF93GpLXlucZ",
        },
        {
          uri: "spotify:track:39LmTF9RgyakzSYX8txrow",
          title: "Imagine",
          artist: "Ariana Grande",
          spotifyId: "39LmTF9RgyakzSYX8txrow",
        },
        {
          uri: "spotify:track:0VjIjW4GlUZAMYd2vXMi3b",
          title: "Blinding Lights",
          artist: "The Weeknd",
          spotifyId: "0VjIjW4GlUZAMYd2vXMi3b",
        },
        {
          uri: "spotify:track:60ynsPSSKe6O3sfwRnIBRf",
          title: "Streets",
          artist: "Doja Cat",
          spotifyId: "60ynsPSSKe6O3sfwRnIBRf",
        },
        {
          uri: "spotify:track:6ocbgoVGwYJhOv1GgI9NsF",
          title: "7 rings",
          artist: "Ariana Grande",
          spotifyId: "6ocbgoVGwYJhOv1GgI9NsF",
        },
        {
          uri: "spotify:track:7szuecWAPwGoV1e5vGu8tl",
          title: "In Your Eyes",
          artist: "The Weeknd",
          spotifyId: "7szuecWAPwGoV1e5vGu8tl",
        },
        {
          uri: "spotify:track:3DarAbFujv6eYNliUTyqtz",
          title: "Kiss Me More",
          artist: "Doja Cat",
          spotifyId: "3DarAbFujv6eYNliUTyqtz",
        },
        {
          uri: "spotify:track:5OCJzvD7sykQEKHH7qAC3C",
          title: "God is a woman",
          artist: "Ariana Grande",
          spotifyId: "5OCJzvD7sykQEKHH7qAC3C",
        },
        {
          uri: "spotify:track:4frLb7nWtsz2ymBE6k2GRP",
          title: "Earned It",
          artist: "The Weeknd",
          spotifyId: "4frLb7nWtsz2ymBE6k2GRP",
        },
      ],
    },
    {
      name: "Turn Up with Travis & Future",
      description:
        "Get ready to party and feel the energy with the ultimate playlist featuring Travis Scott, Metro Boomin, and Future!",
      userId: "Beatmatch-AI",
      tracks: [
        {
          uri: "spotify:track:2xLMifQCjDGFmkHkpNLD9h",
          title: "SICKO MODE",
          artist: "Travis Scott",
          spotifyId: "2xLMifQCjDGFmkHkpNLD9h",
        },
        {
          uri: "spotify:track:27GmP9AWRs744SzKcpJsTZ",
          title: "Jumpman",
          artist: "Drake & Future",
          spotifyId: "27GmP9AWRs744SzKcpJsTZ",
        },
        {
          uri: "spotify:track:0VgkVdmE4gld66l8iyGjgx",
          title: "Mask Off",
          artist: "Future",
          spotifyId: "0VgkVdmE4gld66l8iyGjgx",
        },
        {
          uri: "spotify:track:1wHZx0LgzFHyeIZkUydNXq",
          title: "Antidote",
          artist: "Travis Scott",
          spotifyId: "1wHZx0LgzFHyeIZkUydNXq",
        },
        {
          uri: "spotify:track:2cYqizR4lgvp4Qu6IQ3qGN",
          title: "Butterfly Effect",
          artist: "Travis Scott",
          spotifyId: "2cYqizR4lgvp4Qu6IQ3qGN",
        },
        {
          uri: "spotify:track:3WcC6NH9J77xPEvj1SOL7z",
          title: "March Madness",
          artist: "Future",
          spotifyId: "3WcC6NH9J77xPEvj1SOL7z",
        },
        {
          uri: "spotify:track:6gBFPUFcJLzWGx4lenP6h2",
          title: "goosebumps",
          artist: "Travis Scott",
          spotifyId: "6gBFPUFcJLzWGx4lenP6h2",
        },
        {
          uri: "spotify:track:3eekarcy7kvN4yt5ZFzltW",
          title: "Highest in the Room",
          artist: "Travis Scott",
          spotifyId: "3eekarcy7kvN4yt5ZFzltW",
        },
        {
          uri: "spotify:track:51rXHuKN8Loc4sUlKPODgH",
          title: "King's Dead",
          artist: "Jay Rock, Kendrick Lamar, Future, James Blake",
          spotifyId: "51rXHuKN8Loc4sUlKPODgH",
        },
        {
          uri: "spotify:track:7jslhIiELQkgW9IHeYNOWE",
          title: "Big Rings",
          artist: "Drake & Future",
          spotifyId: "7jslhIiELQkgW9IHeYNOWE",
        },
        {
          uri: "spotify:track:156LzfvMNKuXuiot4uzhGD",
          title: "No Complaints",
          artist: "Metro Boomin",
          spotifyId: "156LzfvMNKuXuiot4uzhGD",
        },
        {
          uri: "spotify:track:1SGt65i9AnXYdDQt1AtDRH",
          title: "3500",
          artist: "Travis Scott",
          spotifyId: "1SGt65i9AnXYdDQt1AtDRH",
        },
        {
          uri: "spotify:track:7EiZI6JVHllARrX9PUvAdX",
          title: "Low Life",
          artist: "Future",
          spotifyId: "7EiZI6JVHllARrX9PUvAdX",
        },
        {
          uri: "spotify:track:6LyAwkJsHlW7RQ8S1cYAtM",
          title: "Overdue",
          artist: "Metro Boomin",
          spotifyId: "6LyAwkJsHlW7RQ8S1cYAtM",
        },
      ],
    },
    {
      name: "Cruisin' Vibes",
      description:
        "Hop in, buckle up, and let these chill tunes by Frank Ocean, SZA, and Daniel Caesar take you on a smooth ride!",
      userId: "Beatmatch-AI",
      tracks: [
        {
          uri: "spotify:track:7DfFc7a6Rwfi3YQMRbDMau",
          title: "Thinkin Bout You",
          artist: "Frank Ocean",
          spotifyId: "7DfFc7a6Rwfi3YQMRbDMau",
        },
        {
          uri: "spotify:track:0P6AWOA4LG1XOctzaVu5tt",
          title: "The Weekend",
          artist: "SZA",
          spotifyId: "0P6AWOA4LG1XOctzaVu5tt",
        },
        {
          uri: "spotify:track:2uP6t2J5MEwhr9rDkAAzwh",
          title: "Get You (feat. Kali Uchis)",
          artist: "Daniel Caesar",
          spotifyId: "2uP6t2J5MEwhr9rDkAAzwh",
        },
        {
          uri: "spotify:track:3xKsf9qdS1CyvXSMEid6g8",
          title: "Pink + White",
          artist: "Frank Ocean",
          spotifyId: "3xKsf9qdS1CyvXSMEid6g8",
        },
        {
          uri: "spotify:track:2fXwCWkh6YG5zU1IyvQrbs",
          title: "Broken Clocks",
          artist: "SZA",
          spotifyId: "2fXwCWkh6YG5zU1IyvQrbs",
        },
        {
          uri: "spotify:track:1Q7EgiMOuwDcB0PJC6AzON",
          title: "Best Part (feat. H.E.R.)",
          artist: "Daniel Caesar",
          spotifyId: "1Q7EgiMOuwDcB0PJC6AzON",
        },
        {
          uri: "spotify:track:5GUYJTQap5F3RDQiCOJhrS",
          title: "Self Control",
          artist: "Frank Ocean",
          spotifyId: "5GUYJTQap5F3RDQiCOJhrS",
        },
        {
          uri: "spotify:track:06u5LrUpbosQlQ1QJFhPpG",
          title: "Drew Barrymore",
          artist: "SZA",
          spotifyId: "06u5LrUpbosQlQ1QJFhPpG",
        },
        {
          uri: "spotify:track:7eqoqGkKwgOaWNNHx90uEZ",
          title: "Nights",
          artist: "Frank Ocean",
          spotifyId: "7eqoqGkKwgOaWNNHx90uEZ",
        },
        {
          uri: "spotify:track:19woxaSpjOefa2JnAOoqW5",
          title: "Garden (Say It Like Dat)",
          artist: "SZA",
          spotifyId: "19woxaSpjOefa2JnAOoqW5",
        },
        {
          uri: "spotify:track:7IVukH71OXfAu3KudrrizN",
          title: "Japanese Denim",
          artist: "Daniel Caesar",
          spotifyId: "7IVukH71OXfAu3KudrrizN",
        },
        {
          uri: "spotify:track:2ZWlPOoWh0626oTaHrnl2a",
          title: "Ivy",
          artist: "Frank Ocean",
          spotifyId: "2ZWlPOoWh0626oTaHrnl2a",
        },
        {
          uri: "spotify:track:5wTVNpi5WDByxBgKgUE6MU",
          title: "Supermodel",
          artist: "SZA",
          spotifyId: "5wTVNpi5WDByxBgKgUE6MU",
        },
        {
          uri: "spotify:track:2XjoHA58XD0t3qye8bYGU8",
          title: "Blessed",
          artist: "Daniel Caesar",
          spotifyId: "2XjoHA58XD0t3qye8bYGU8",
        },
        {
          uri: "spotify:track:3GZD6HmiNUhxXYf8Gch723",
          title: "Lost",
          artist: "Frank Ocean",
          spotifyId: "3GZD6HmiNUhxXYf8Gch723",
        },
        {
          uri: "spotify:track:0336UwEBwBBao8uWCuugYr",
          title: "Anything",
          artist: "SZA",
          spotifyId: "0336UwEBwBBao8uWCuugYr",
        },
        {
          uri: "spotify:track:3m5rs2BeWjLUe0Ygc6aM7i",
          title: "Streetcar",
          artist: "Daniel Caesar",
          spotifyId: "3m5rs2BeWjLUe0Ygc6aM7i",
        },
        {
          uri: "spotify:track:6R6ihJhRbgu7JxJKIbW57w",
          title: "Provider",
          artist: "Frank Ocean",
          spotifyId: "6R6ihJhRbgu7JxJKIbW57w",
        },
        {
          uri: "spotify:track:5fQBa4wkmq28xpSLOQ202K",
          title: "Normal Girl",
          artist: "SZA",
          spotifyId: "5fQBa4wkmq28xpSLOQ202K",
        },
      ],
    },
    {
      name: "Rap & Run: Hustle Hard Workout Mix",
      description:
        "Get ready to sweat and grind with this pumped-up playlist to keep you motivated during your workout!",
      userId: "Beatmatch-AI",
      tracks: [
        {
          uri: "spotify:track:1v7L65Lzy0j0vdpRjJewt1",
          title: "Lose Yourself",
          artist: "Eminem",
          spotifyId: "1v7L65Lzy0j0vdpRjJewt1",
        },
        {
          uri: "spotify:track:7KXjTSCq5nL1LoYtL7XAwS",
          title: "HUMBLE.",
          artist: "Kendrick Lamar",
          spotifyId: "7KXjTSCq5nL1LoYtL7XAwS",
        },
        {
          uri: "spotify:track:4xkOaSrkexMciUUogZKVTS",
          title: "Till I Collapse",
          artist: "Eminem",
          spotifyId: "4xkOaSrkexMciUUogZKVTS",
        },
        {
          uri: "spotify:track:52A8OAP8lTQKZCj4Rce92B",
          title: "A Tale of 2 Citiez",
          artist: "J. Cole",
          spotifyId: "52A8OAP8lTQKZCj4Rce92B",
        },
        {
          uri: "spotify:track:6HZILIRieu8S0iqY8kIKhj",
          title: "DNA.",
          artist: "Kendrick Lamar",
          spotifyId: "6HZILIRieu8S0iqY8kIKhj",
        },
        {
          uri: "spotify:track:7Ie9W94M7OjPoZVV216Xus",
          title: "Not Afraid",
          artist: "Eminem",
          spotifyId: "7Ie9W94M7OjPoZVV216Xus",
        },
        {
          uri: "spotify:track:68Dni7IE4VyPkTOH9mRWHr",
          title: "No Role Modelz",
          artist: "J. Cole",
          spotifyId: "68Dni7IE4VyPkTOH9mRWHr",
        },
        {
          uri: "spotify:track:3iVcZ5G6tvkXZkZKlMpIUs",
          title: "Alright",
          artist: "Kendrick Lamar",
          spotifyId: "3iVcZ5G6tvkXZkZKlMpIUs",
        },
        {
          uri: "spotify:track:3stOygN0I7CIvkEB2LJGbv",
          title: "Survival",
          artist: "Eminem",
          spotifyId: "3stOygN0I7CIvkEB2LJGbv",
        },
      ],
    },
    {
      name: "Love Notes for Studious Souls",
      description: "Get lost in romantic melodies while hitting the books!",
      userId: "Beatmatch-AI",
      tracks: [
        {
          uri: "spotify:track:0tgVpDi06FyKpA1z0VMD4v",
          title: "Perfect",
          artist: "Ed Sheeran",
          spotifyId: "0tgVpDi06FyKpA1z0VMD4v",
        },
        {
          uri: "spotify:track:2QZ7WLBE8h2y1Y5Fb8RYbH",
          title: "In My Blood",
          artist: "Shawn Mendes",
          spotifyId: "2QZ7WLBE8h2y1Y5Fb8RYbH",
        },
        {
          uri: "spotify:track:34gCuhDGsG4bRPIf9bb02f",
          title: "Thinking Out Loud",
          artist: "Ed Sheeran",
          spotifyId: "34gCuhDGsG4bRPIf9bb02f",
        },
        {
          uri: "spotify:track:5jsw9uXEGuKyJzs0boZ1bT",
          title: "Stitches",
          artist: "Shawn Mendes",
          spotifyId: "5jsw9uXEGuKyJzs0boZ1bT",
        },
        {
          uri: "spotify:track:7qiZfU4dY1lWllzX7mPBI3",
          title: "Shape of You",
          artist: "Ed Sheeran",
          spotifyId: "7qiZfU4dY1lWllzX7mPBI3",
        },
        {
          uri: "spotify:track:79esEXlqqmq0GPz0xQSZTV",
          title: "Lost in Japan",
          artist: "Shawn Mendes",
          spotifyId: "79esEXlqqmq0GPz0xQSZTV",
        },
        {
          uri: "spotify:track:1HNkqx9Ahdgi1Ixy2xkKkL",
          title: "Photograph",
          artist: "Ed Sheeran",
          spotifyId: "1HNkqx9Ahdgi1Ixy2xkKkL",
        },
        {
          uri: "spotify:track:7JJmb5XwzOO8jgpou264Ml",
          title: "There's Nothing Holdin' Me Back",
          artist: "Shawn Mendes",
          spotifyId: "7JJmb5XwzOO8jgpou264Ml",
        },
        {
          uri: "spotify:track:6PCUP3dWmTjcTtXY02oFdT",
          title: "Castle on the Hill",
          artist: "Ed Sheeran",
          spotifyId: "6PCUP3dWmTjcTtXY02oFdT",
        },
        {
          uri: "spotify:track:0AS63m1wHv9n4VVRizK6Hc",
          title: "Mercy",
          artist: "Shawn Mendes",
          spotifyId: "0AS63m1wHv9n4VVRizK6Hc",
        },
        {
          uri: "spotify:track:2RttW7RAu5nOAfq6YFvApB",
          title: "Happier",
          artist: "Ed Sheeran",
          spotifyId: "2RttW7RAu5nOAfq6YFvApB",
        },
        {
          uri: "spotify:track:3QGsuHI8jO1Rx4JWLUh9jd",
          title: "Treat You Better",
          artist: "Shawn Mendes",
          spotifyId: "3QGsuHI8jO1Rx4JWLUh9jd",
        },
        {
          uri: "spotify:track:0afhq8XCExXpqazXczTSve",
          title: "Galway Girl",
          artist: "Ed Sheeran",
          spotifyId: "0afhq8XCExXpqazXczTSve",
        },
        {
          uri: "spotify:track:1h0yImRPIVAjhhHeNVlTuC",
          title: "Youth",
          artist: "Shawn Mendes",
          spotifyId: "1h0yImRPIVAjhhHeNVlTuC",
        },
        {
          uri: "spotify:track:3HVWdVOQ0ZA45FuZGSfvns",
          title: "I Don't Care",
          artist: "Ed Sheeran",
          spotifyId: "3HVWdVOQ0ZA45FuZGSfvns",
        },
      ],
    },
    {
      name: "Reggaeton Rager: Bunny, Balvin, and Beats",
      description:
        "Get ready to turn up the volume and shake it on the dance floor with this sizzling Reggaeton playlist!",
      userId: "Beatmatch-AI",
      tracks: [
        {
          uri: "spotify:track:2DEZmgHKAvm41k4J3R2E9Y",
          title: "Safaera",
          artist: "Bad Bunny",
          spotifyId: "2DEZmgHKAvm41k4J3R2E9Y",
        },
        {
          uri: "spotify:track:6Ges5C2IE738iJh4HyQizQ",
          title: "Ay Vamos",
          artist: "J Balvin",
          spotifyId: "6Ges5C2IE738iJh4HyQizQ",
        },
        {
          uri: "spotify:track:7qGlmtbPmILIzNIrzwabQw",
          title: "Me Gusta",
          artist: "Arcángel",
          spotifyId: "7qGlmtbPmILIzNIrzwabQw",
        },
        {
          uri: "spotify:track:47EiUVwUp4C9fGccaPuUCS",
          title: "Dákiti",
          artist: "Bad Bunny, Jhay Cortez",
          spotifyId: "47EiUVwUp4C9fGccaPuUCS",
        },
        {
          uri: "spotify:track:4G3PTss3mU33Tau7t4KbwE",
          title: "Tattoo",
          artist: "Rauw Alejandro, Camilo",
          spotifyId: "4G3PTss3mU33Tau7t4KbwE",
        },
        {
          uri: "spotify:track:2SbzdGpOKlH3HIAGTWTbwU",
          title: "La Modelo",
          artist: "Ozuna, Cardi B",
          spotifyId: "2SbzdGpOKlH3HIAGTWTbwU",
        },
        {
          uri: "spotify:track:5lhcHMDQpNwhM62lSOrvLf",
          title: "Ahora Dice",
          artist: "Chris Jeday, J Balvin, Ozuna, Arcángel",
          spotifyId: "5lhcHMDQpNwhM62lSOrvLf",
        },
        {
          uri: "spotify:track:3gE4eQH3K83Sght0ZLvuBK",
          title: "Mia",
          artist: "Bad Bunny, Drake",
          spotifyId: "3gE4eQH3K83Sght0ZLvuBK",
        },
        {
          uri: "spotify:track:2C2TGgFzrTRIOdQS1vUN5h",
          title: "Ginza",
          artist: "J Balvin",
          spotifyId: "2C2TGgFzrTRIOdQS1vUN5h",
        },
        {
          uri: "spotify:track:2FIm6YsSGL5acOqSuJDh5s",
          title: "Me Acostumbré",
          artist: "Arcángel, Bad Bunny",
          spotifyId: "2FIm6YsSGL5acOqSuJDh5s",
        },
        {
          uri: "spotify:track:2n7ohqg1s68ToAHh4u9mcW",
          title: "Vete",
          artist: "Bad Bunny",
          spotifyId: "2n7ohqg1s68ToAHh4u9mcW",
        },
        {
          uri: "spotify:track:5pXy29xzxR3aTB0SYRI590",
          title: "Blanco",
          artist: "J Balvin",
          spotifyId: "5pXy29xzxR3aTB0SYRI590",
        },
        {
          uri: "spotify:track:06s3QtMJVXw1AJX3UfvZG1",
          title: "Hasta Que Dios Diga",
          artist: "Anuel AA, Bad Bunny",
          spotifyId: "06s3QtMJVXw1AJX3UfvZG1",
        },
        {
          uri: "spotify:track:1uhZNwvXyOBfalGrvU5vJR",
          title: "Flow",
          artist: "Arcángel",
          spotifyId: "1uhZNwvXyOBfalGrvU5vJR",
        },
        {
          uri: "spotify:track:2XIc1pqjXV3Cr2BQUGNBck",
          title: "La Noche de Anoche",
          artist: "Bad Bunny, Rosalía",
          spotifyId: "2XIc1pqjXV3Cr2BQUGNBck",
        },
      ],
    },
    {
      name: "Snooze & Smooth Jazz Vibes",
      description:
        "Get ready to drift off to dreamland with these chill jazz, soul, and blues tunes!",
      userId: "Beatmatch-AI",
      tracks: [
        {
          uri: "spotify:track:4vLYewWIvqHfKtJDk8c8tq",
          title: "So What",
          artist: "Miles Davis",
          spotifyId: "4vLYewWIvqHfKtJDk8c8tq",
        },
        {
          uri: "spotify:track:4Hhv2vrOTy89HFRcjU3QOx",
          title: "At Last",
          artist: "Etta James",
          spotifyId: "4Hhv2vrOTy89HFRcjU3QOx",
        },
        {
          uri: "spotify:track:1CTex49P0iWwzUGsMNjgaV",
          title: "Strange Fruit",
          artist: "Billie Holiday",
          spotifyId: "1CTex49P0iWwzUGsMNjgaV",
        },
        {
          uri: "spotify:track:1YQWosTIljIvxAgHWTp7KP",
          title: "Take Five",
          artist: "Dave Brubeck",
          spotifyId: "1YQWosTIljIvxAgHWTp7KP",
        },
        {
          uri: "spotify:track:0D0NwBMfJPoh1sZ61p5Fot",
          title: "A Change Is Gonna Come",
          artist: "Sam Cooke",
          spotifyId: "0D0NwBMfJPoh1sZ61p5Fot",
        },
        {
          uri: "spotify:track:1xkPKHCwSjz8kGAwWie87q",
          title: "Stormy Monday",
          artist: "T-Bone Walker",
          spotifyId: "1xkPKHCwSjz8kGAwWie87q",
        },
        {
          uri: "spotify:track:2JOEPbuwVf0nafGnMSVEhH",
          title: "My Favorite Things",
          artist: "John Coltrane",
          spotifyId: "2JOEPbuwVf0nafGnMSVEhH",
        },
        {
          uri: "spotify:track:1kPBT8S2wJFNAyBMnGVZgL",
          title: "I'd Rather Go Blind",
          artist: "Etta James",
          spotifyId: "1kPBT8S2wJFNAyBMnGVZgL",
        },
        {
          uri: "spotify:track:6Rqn2GFlmvmV4w9Ala0I1e",
          title: "Feeling Good",
          artist: "Nina Simone",
          spotifyId: "6Rqn2GFlmvmV4w9Ala0I1e",
        },
        {
          uri: "spotify:track:1k1Bqnv2R0uJXQN4u6LKYt",
          title: "Ain't No Sunshine",
          artist: "Bill Withers",
          spotifyId: "1k1Bqnv2R0uJXQN4u6LKYt",
        },
        {
          uri: "spotify:track:4NQfrmGs9iQXVQI9IpRhjM",
          title: "The Thrill Is Gone",
          artist: "B.B. King",
          spotifyId: "4NQfrmGs9iQXVQI9IpRhjM",
        },
        {
          uri: "spotify:track:0X5DcGkbxCXSadgj01ZXd7",
          title: "Autumn Leaves",
          artist: "Cannonball Adderley",
          spotifyId: "0X5DcGkbxCXSadgj01ZXd7",
        },
        {
          uri: "spotify:track:3M8FzayQWtkvOhqMn2V4T2",
          title: "Lean on Me",
          artist: "Bill Withers",
          spotifyId: "3M8FzayQWtkvOhqMn2V4T2",
        },
        {
          uri: "spotify:track:6TH2QNqd4l7TSerz5j9LpA",
          title: "I'd Rather Be Blind, Crippled and Crazy",
          artist: "The Derek Trucks Band",
          spotifyId: "6TH2QNqd4l7TSerz5j9LpA",
        },
        {
          uri: "spotify:track:4p4XgwnZJCYOWSvz8ruiOY",
          title: "Take The 'A' Train",
          artist: "Duke Ellington",
          spotifyId: "4p4XgwnZJCYOWSvz8ruiOY",
        },
        {
          uri: "spotify:track:0bRXwKfigvpKZUurwqAlEh",
          title: "Lovely Day",
          artist: "Bill Withers",
          spotifyId: "0bRXwKfigvpKZUurwqAlEh",
        },
        {
          uri: "spotify:track:2PcbVKT28p9mOlWBDL371J",
          title: "I Can't Quit You Baby",
          artist: "Willie Dixon",
          spotifyId: "2PcbVKT28p9mOlWBDL371J",
        },
        {
          uri: "spotify:track:0sCeNwt8xRCMR4NhKpMyBe",
          title: "Cantaloupe Island",
          artist: "Herbie Hancock",
          spotifyId: "0sCeNwt8xRCMR4NhKpMyBe",
        },
        {
          uri: "spotify:track:63xdwScd1Ai1GigAwQxE8y",
          title: "Let's Stay Together",
          artist: "Al Green",
          spotifyId: "63xdwScd1Ai1GigAwQxE8y",
        },
        {
          uri: "spotify:track:3HuLpW8NmFFO5GKY8andY2",
          title: "The Nearness of You",
          artist: "Norah Jones",
          spotifyId: "3HuLpW8NmFFO5GKY8andY2",
        },
      ],
    },
    {
      name: "Snooze & Smooth Jazz Vibes",
      description:
        "Get ready to drift off to dreamland with these chill jazz, soul, and blues tunes!",
      userId: "Beatmatch-AI",
      tracks: [
        {
          uri: "spotify:track:4vLYewWIvqHfKtJDk8c8tq",
          title: "So What",
          artist: "Miles Davis",
          spotifyId: "4vLYewWIvqHfKtJDk8c8tq",
        },
        {
          uri: "spotify:track:4Hhv2vrOTy89HFRcjU3QOx",
          title: "At Last",
          artist: "Etta James",
          spotifyId: "4Hhv2vrOTy89HFRcjU3QOx",
        },
        {
          uri: "spotify:track:1CTex49P0iWwzUGsMNjgaV",
          title: "Strange Fruit",
          artist: "Billie Holiday",
          spotifyId: "1CTex49P0iWwzUGsMNjgaV",
        },
        {
          uri: "spotify:track:1YQWosTIljIvxAgHWTp7KP",
          title: "Take Five",
          artist: "Dave Brubeck",
          spotifyId: "1YQWosTIljIvxAgHWTp7KP",
        },
        {
          uri: "spotify:track:0D0NwBMfJPoh1sZ61p5Fot",
          title: "A Change Is Gonna Come",
          artist: "Sam Cooke",
          spotifyId: "0D0NwBMfJPoh1sZ61p5Fot",
        },
        {
          uri: "spotify:track:1xkPKHCwSjz8kGAwWie87q",
          title: "Stormy Monday",
          artist: "T-Bone Walker",
          spotifyId: "1xkPKHCwSjz8kGAwWie87q",
        },
        {
          uri: "spotify:track:2JOEPbuwVf0nafGnMSVEhH",
          title: "My Favorite Things",
          artist: "John Coltrane",
          spotifyId: "2JOEPbuwVf0nafGnMSVEhH",
        },
        {
          uri: "spotify:track:1kPBT8S2wJFNAyBMnGVZgL",
          title: "I'd Rather Go Blind",
          artist: "Etta James",
          spotifyId: "1kPBT8S2wJFNAyBMnGVZgL",
        },
        {
          uri: "spotify:track:6Rqn2GFlmvmV4w9Ala0I1e",
          title: "Feeling Good",
          artist: "Nina Simone",
          spotifyId: "6Rqn2GFlmvmV4w9Ala0I1e",
        },
        {
          uri: "spotify:track:1k1Bqnv2R0uJXQN4u6LKYt",
          title: "Ain't No Sunshine",
          artist: "Bill Withers",
          spotifyId: "1k1Bqnv2R0uJXQN4u6LKYt",
        },
        {
          uri: "spotify:track:4NQfrmGs9iQXVQI9IpRhjM",
          title: "The Thrill Is Gone",
          artist: "B.B. King",
          spotifyId: "4NQfrmGs9iQXVQI9IpRhjM",
        },
        {
          uri: "spotify:track:0X5DcGkbxCXSadgj01ZXd7",
          title: "Autumn Leaves",
          artist: "Cannonball Adderley",
          spotifyId: "0X5DcGkbxCXSadgj01ZXd7",
        },
        {
          uri: "spotify:track:3M8FzayQWtkvOhqMn2V4T2",
          title: "Lean on Me",
          artist: "Bill Withers",
          spotifyId: "3M8FzayQWtkvOhqMn2V4T2",
        },
        {
          uri: "spotify:track:6TH2QNqd4l7TSerz5j9LpA",
          title: "I'd Rather Be Blind, Crippled and Crazy",
          artist: "The Derek Trucks Band",
          spotifyId: "6TH2QNqd4l7TSerz5j9LpA",
        },
        {
          uri: "spotify:track:4p4XgwnZJCYOWSvz8ruiOY",
          title: "Take The 'A' Train",
          artist: "Duke Ellington",
          spotifyId: "4p4XgwnZJCYOWSvz8ruiOY",
        },
        {
          uri: "spotify:track:0bRXwKfigvpKZUurwqAlEh",
          title: "Lovely Day",
          artist: "Bill Withers",
          spotifyId: "0bRXwKfigvpKZUurwqAlEh",
        },
        {
          uri: "spotify:track:2PcbVKT28p9mOlWBDL371J",
          title: "I Can't Quit You Baby",
          artist: "Willie Dixon",
          spotifyId: "2PcbVKT28p9mOlWBDL371J",
        },
        {
          uri: "spotify:track:0sCeNwt8xRCMR4NhKpMyBe",
          title: "Cantaloupe Island",
          artist: "Herbie Hancock",
          spotifyId: "0sCeNwt8xRCMR4NhKpMyBe",
        },
        {
          uri: "spotify:track:63xdwScd1Ai1GigAwQxE8y",
          title: "Let's Stay Together",
          artist: "Al Green",
          spotifyId: "63xdwScd1Ai1GigAwQxE8y",
        },
        {
          uri: "spotify:track:3HuLpW8NmFFO5GKY8andY2",
          title: "The Nearness of You",
          artist: "Norah Jones",
          spotifyId: "3HuLpW8NmFFO5GKY8andY2",
        },
      ],
    },
    {
      name: "Electro Pump-Up Party",
      description:
        "Get ready to sweat it out with this electrifying playlist that will keep you pumped up!",
      userId: "Beatmatch-AI",
      tracks: [
        {
          uri: "spotify:track:6ho0GyrWZN3mhi9zVRW7xi",
          title: "Losing It",
          artist: "Fisher",
          spotifyId: "6ho0GyrWZN3mhi9zVRW7xi",
        },
        {
          uri: "spotify:track:67awxiNHNyjMXhVgsHuIrs",
          title: "Turn Down for What",
          artist: "DJ Snake, Lil Jon",
          spotifyId: "67awxiNHNyjMXhVgsHuIrs",
        },
        {
          uri: "spotify:track:0DiWol3AO6WpXZgp0goxAV",
          title: "One More Time",
          artist: "Daft Punk",
          spotifyId: "0DiWol3AO6WpXZgp0goxAV",
        },
        {
          uri: "spotify:track:0A9mHc7oYUoCECqByV8cQR",
          title: "Animals",
          artist: "Martin Garrix",
          spotifyId: "0A9mHc7oYUoCECqByV8cQR",
        },
        {
          uri: "spotify:track:5DdDbJvoaT8fqQMJkiGg4T",
          title: "Take Over Control",
          artist: "Afrojack, Eva Simons",
          spotifyId: "5DdDbJvoaT8fqQMJkiGg4T",
        },
        {
          uri: "spotify:track:60wwxj6Dd9NJlirf84wr2c",
          title: "Clarity",
          artist: "Zedd, Foxes",
          spotifyId: "60wwxj6Dd9NJlirf84wr2c",
        },
        {
          uri: "spotify:track:2V65y3PX4DkRhy1djlxd9p",
          title: "Don't You Worry Child",
          artist: "Swedish House Mafia, John Martin",
          spotifyId: "2V65y3PX4DkRhy1djlxd9p",
        },
        {
          uri: "spotify:track:0TDLuuLlV54CkRRUOahJb4",
          title: "Titanium",
          artist: "David Guetta, Sia",
          spotifyId: "0TDLuuLlV54CkRRUOahJb4",
        },
        {
          uri: "spotify:track:1trC8L8YpawkU553ymy2zC",
          title: "Calling (Lose My Mind)",
          artist: "Sebastian Ingrosso, Alesso, Ryan Tedder",
          spotifyId: "1trC8L8YpawkU553ymy2zC",
        },
        {
          uri: "spotify:track:24LS4lQShWyixJ0ZrJXfJ5",
          title: "Sweet Nothing",
          artist: "Calvin Harris, Florence Welch",
          spotifyId: "24LS4lQShWyixJ0ZrJXfJ5",
        },
      ],
    },
    {
      name: "Chill Vibes for Focus Minds",
      description:
        "Unwind with some lo-fi and indie tunes to keep your focus sharp!",
      userId: "Beatmatch-AI",
      tracks: [
        {
          uri: "spotify:track:3WRQUvzRvBDr4AxMWhXc5E",
          title: "Sunset Lover",
          artist: "Petit Biscuit",
          spotifyId: "3WRQUvzRvBDr4AxMWhXc5E",
        },
        {
          uri: "spotify:track:35KiiILklye1JRRctaLUb4",
          title: "Holocene",
          artist: "Bon Iver",
          spotifyId: "35KiiILklye1JRRctaLUb4",
        },
        {
          uri: "spotify:track:0ofHAoxe9vBkTCp2UQIavz",
          title: "Dreams",
          artist: "Fleetwood Mac",
          spotifyId: "0ofHAoxe9vBkTCp2UQIavz",
        },
        {
          uri: "spotify:track:1gk3FhAV07q9Jg77UxnVjX",
          title: "Gooey",
          artist: "Glass Animals",
          spotifyId: "1gk3FhAV07q9Jg77UxnVjX",
        },
        {
          uri: "spotify:track:0uKrhHBDUQ4w5fv4qwOubP",
          title: "Breathe",
          artist: "Telepopmusik",
          spotifyId: "0uKrhHBDUQ4w5fv4qwOubP",
        },
        {
          uri: "spotify:track:3B3eOgLJSqPEA0RfboIQVM",
          title: "Skinny Love",
          artist: "Bon Iver",
          spotifyId: "3B3eOgLJSqPEA0RfboIQVM",
        },
        {
          uri: "spotify:track:6GyFP1nfCDB8lbD2bG0Hq9",
          title: "Midnight City",
          artist: "M83",
          spotifyId: "6GyFP1nfCDB8lbD2bG0Hq9",
        },
        {
          uri: "spotify:track:6IBpFG2LU2udYofIuROp3w",
          title: "Lost in the Light",
          artist: "Bahamas",
          spotifyId: "6IBpFG2LU2udYofIuROp3w",
        },
        {
          uri: "spotify:track:3AqPL1n1wKc5DVFFnYuJhp",
          title: "To Build a Home",
          artist: "The Cinematic Orchestra",
          spotifyId: "3AqPL1n1wKc5DVFFnYuJhp",
        },
        {
          uri: "spotify:track:0bhBtXHQX3u6dSAPF59qGx",
          title: "Flume",
          artist: "Bon Iver",
          spotifyId: "0bhBtXHQX3u6dSAPF59qGx",
        },
        {
          uri: "spotify:track:5zFaNeTwCtsBbMc72FtXVo",
          title: "Stay High",
          artist: "Brittany Howard",
          spotifyId: "5zFaNeTwCtsBbMc72FtXVo",
        },
        {
          uri: "spotify:track:6EXi6ZqTITKGtVBKqbphjL",
          title: "Porcelain",
          artist: "Moby",
          spotifyId: "6EXi6ZqTITKGtVBKqbphjL",
        },
        {
          uri: "spotify:track:2IqjKEBiz0CdLKdkXhxw84",
          title: "Retrograde",
          artist: "James Blake",
          spotifyId: "2IqjKEBiz0CdLKdkXhxw84",
        },
        {
          uri: "spotify:track:5ibNaVO251Pb2c0Wdl00gG",
          title: "Heartbeats",
          artist: "José González",
          spotifyId: "5ibNaVO251Pb2c0Wdl00gG",
        },
        {
          uri: "spotify:track:20AC70RUlVz6A6dCcQ5tRS",
          title: "Re:Stacks",
          artist: "Bon Iver",
          spotifyId: "20AC70RUlVz6A6dCcQ5tRS",
        },
        {
          uri: "spotify:track:01Q3OyB05mLgH01fpdAMPP",
          title: "Wait",
          artist: "M83",
          spotifyId: "01Q3OyB05mLgH01fpdAMPP",
        },
        {
          uri: "spotify:track:4Q66chx9WzqWcLItXoZ5r4",
          title: "Cherry Wine",
          artist: "Hozier",
          spotifyId: "4Q66chx9WzqWcLItXoZ5r4",
        },
        {
          uri: "spotify:track:2tznHmp70DxMyr2XhWLOW0",
          title: "Cigarette Daydreams",
          artist: "Cage The Elephant",
          spotifyId: "2tznHmp70DxMyr2XhWLOW0",
        },
        {
          uri: "spotify:track:3Qp1ja1oYotWn5K0XBRrUV",
          title: "Eyes Be Closed",
          artist: "Washed Out",
          spotifyId: "3Qp1ja1oYotWn5K0XBRrUV",
        },
        {
          uri: "spotify:track:4wG82w1L31yQhgGiWt6gIb",
          title: "Stubborn Love",
          artist: "The Lumineers",
          spotifyId: "4wG82w1L31yQhgGiWt6gIb",
        },
      ],
    },
  ]);

  print("Seed data inserted successfully");
} catch (error) {
  print("Error:", error);
}
