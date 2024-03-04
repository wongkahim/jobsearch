// Sample Data
// new Job(
//   (job_id = "8yv3oA_2-UYAAAAAAAAAAA=="),
//   (employer_logo =
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlgydP7sElaJC9qPrtNHwBhyTMHYgii1RPWsy&s=0"),
//   (employer_name = "Dice"),
//   (job_title = "Web Developer - 6-month Contract - Houston Hybrid"),
//   (job_country = "US")
// ),
// new Job(
//   (job_id = "G6qYxpAYyVsAAAAAAAAAAA=="),
//   (employer_logo =
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Charles_Schwab_Corporation_logo.svg/1200px-Charles_Schwab_Corporation_logo.svg.png"),
//   (employer_name = "Charles Schwab"),
//   (job_title = "Software Web Developer"),
//   (job_country = "US")
// ),

export class Job {
  constructor(job_id, employer_logo, employer_name, job_title, job_country) {
    this.job_id = job_id;
    this.employer_logo = employer_logo;
    this.employer_name = employer_name;
    this.job_title = job_title;
    this.job_country = job_country;
  }
}
