# Networks of Roman Eleusis
*A Digital Scholarship Tool for Studying Ancient Epigraphy*

By [David J. Thomas](mailto:dave.a.base@gmail.com), [thePortus.net](http://thePortus.net)

---

## Background

The Sanctuary of Eleusis was one of the most famous in the ancient world. Its occult rites, known as the Eleusinian Mysteries, literally gave us the world "mysterious." On the borders of Athens, some fourteen miles distant, stood the shrine to The Two Goddesses, Demeter and Kore (Persephone). It's rites, known as the Eleusinian Mysteries, attracted thousands of initiates every year including Athenians of all kinds, tourists and visitors, Greeks, Romans, and even several Roman Emperors.

*At this very spot*, the Athenians believed, Hades sprung from the underworld and snatched Persephone. More proudly, they boasted, it was this same spot where Demeter gave the gift of grain to humankind. The rites included several days of purification, sacrifice, and long marching and dancing into the night. We know very little because of the vow to keep all knowledge of them from any non-initiates.

For centuries, the Athenians published inscriptions in honor of individuals and gods. In the Roman era, however, they erected statues at unprecedented rates. These inscriptions, both in their individuality and in sum, provide evidence on hundreds of individuals and the workings of important institutions.

As time went on in the Roman era, not only were there more inscriptions, people, and honors, but these claims became more interwoven, and people linked themselves to more distant relatives and claims. Visualizing the interconnectedness of all this is nearly impossible traditionally. This site builds tools for the scholars to examine the individuals, institutions, and honors that appear on these inscriptions.

---

An example of the difficulty can be seen in an inscription publicly funded by Athens at Eleusis during the reign of Marcus Aurelius in honor of an extraordinary altar-priest of the sanctuary, Lucius Memmius from the deme of Thorikos. The statue is lost, but the statue base reads…

```
                                    IG II2 3620
                                    c.177-180 C.E.

    ἡ πόλις
    Λ. Μέμμιον ἐπὶ βωμῶι Θορίκιον
    τὸν ἀπὸ δᾳδούχων καὶ ἀρχόντων
    καὶ στρατηγῶν καὶ ἀγωνοθετῶν,
5   τὸν καὶ αὐτὸν μετὰ τῶν ἄλλων ἀρχῶν
    καὶ λιτουργιῶν · ἄρξαντα τὴν ἐπώ-
    νυμον ἀρχὴν καὶ στρατηγὸν ἐπὶ τὰ
    ὅπλα καὶ ἐπιμελητὴν γυμνασιαρχίας
    θεοῦ Ἁδριανοῦ  καὶ ἀγωνοθέτην τρίς,
10  πρεσβευτήν τε πολλάκις περὶ τῶν με-
    γίστων · ἐν οἷς καὶ περὶ γερουσίας · μυή-
    σαντα παρόντος θεοῦ Ἁδριανοῦ,
    μυήσαντα θεὸν Λούκιον Οὐῆρον
    Ἀρμενιακὸν Παρθικὸν καὶ Αὐτοκράτορας
15  Μ. Αὐρήλιον Ἀντωνῖνον · καὶ Μ. Αὐρήλιον
    Κόμμοδον Γερμανικοὺς Σαρματικούς,
    [λ]ιτουργήσαντα τοῖν θεοῖν · ἔτεσι Νϛ, τὸν (as altar-priest) for 56 years,
    [ἀ]π’ ἀρχιερέων · τὸν φιλόπατριν. priests; a patriot.

    The polis (honors)
    L. Memmius, the altar-priest from Thorikos,
    he (being descended) from daduchs and archons
    and generals and agonothetes,
5   himself (having) other offices
    and public benefactions; (including) being eponymous
    archon and hoplite-general
    and overseer of the gymnasiarchy
    of the divine Hadrian; and being agonothete three times,
10  also being an ambassador often concerning the greatest
    affairs; among which also were those concerning the gerousia;
    having initiated when the divine Hadrian was present,
    having initiated the divine Lucius Verus
    Armeniacus Parthicus, and the emperors
15  M. Aurelius Antoninus and M. Aurelius
    Commodus Germanicus Sarmaticus,
    benefacting the two goddesses (as altar-priest) for 56 years,
    and being one of the imperial priests; a patriot.

```

The personal boasts of Memmius reveal much about the values of the Athenian elite under the Roman empire. He was able to claim honors both civic and imperial, Athenian and Roman. Many of the offices that he advertised were public, yet his tenure of the altar-priesthood was private, obtained through his membership in the priestly college of the Kerykes. In proclaiming his descent from daduchs, the most important sacred officials of the Kerykes, and archons, the most important public offices of Athens, Memmius neatly merges civic and sacred elements. The site of Eleusis, and the activities of members of the Kerykes in particular, demonstrate that there was an informal but important connection between political and religious authority. Furthermore, ‘public’ and ‘private’ forms authority were not opposed, but regularly combined for mutual benefit. Similarly, Athenian and Roman identities were not necessarily at odds. Not only was Memmius an altar-priest at the Sanctuary of Eleusis, but he was also an imperial priest who initiated members of the emperor's family. In an attempt to cement their place in the competitive game of status display, elites regularly resorted to both Athenian and Roman honors. Roman honors supplemented, but never surpassed native Athenian status. In combining these elements they constructed a positive understanding of Athens’ place in the Roman empire.

![Dedication to the altar-priest overlayed with links](/client/imgs/misc/intro-2.png)

This project also explores a new possibility for understanding long-term trends by employing dynamic network analysis to visually map changes in the complex combinations of statuses and the reciprocal connections between individuals and institutions recorded on stone. Inscriptions are not merely passive records but also persuasive documents, selectively foregrounding some social realities while eliding others. Tracing these constellations of associations, we can put our finger on the pulse of social competition and status display and understand precisely why 'Romanization' is a difficult term to explain change at the sanctuary.

---

## Installation

#### Install NodeJS

###### Linux (Debian)
```sh
# update package manager
sudo apt-get update
# install node and npm
sudo apt-get install nodejs npm
```

###### OSX
```sh
# install homebrew package manager if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# update package manager
brew update
# install node and npm
brew install node
```

#### Install & Configure MySQL

###### Installing - Linux (Debian)
```sh
# update package manager
sudo apt-get update
# install node and npm
sudo apt-get install mysql-server
```

###### Installing - OSX
```sh
# update package manager
brew update
# install node and npm
brew install mysql
```

###### Setup - Linux & OSX
```sh
# launch mysql as root user
mysql -u root
```

Once the mysql prompt starts enter...

```sql
-- replace eleusisuser and password with whatever you want
CREATE USER 'eleusisuser'@'localhost' IDENTIFIED BY 'password';
-- grant permissions to eleusisuser
GRANT PRIVILEGE ON *.* TO 'eleusisuser'@'localhost';
-- update privileges
FLUSH PRIVILEGES;
```

#### Install Angular & Sequelize CLIs Globally

```sh
npm install -g @angular/cli
npm install -g sequelize-sli
```

#### Clone and Install Repository

```sh
git clone https://github.com/thePortus/networks-of-roman-eleusis.git
cd networks-of-roman-eleusis
npm install
```

Then, edit both configuration files in the `server/config` directory to reflect the username and password you set above. If you want to change the default name of the database, do so here. Now we need to create the database, migrate the models, and seed the starting data.

```sh
sequelize db:create
sequelize db:migrate
sequelize db:seed:all
```

One last step before we can start, we need to compile the front-end application.

```sh
ng build
```

Now launch the server!
```sh
npm start
```

Open your browser to http://localhost:8080 to begin using the application.

The first account to register automatically becomes the owner and is responsible for promoting any other users to editors to make changes. To make sure to register immediatedly (the register button is in the navigation menu at top-left).

---

## Customization

#### How to Edit Database User Settings

Edit the `server/config/config.json` AND `server/config/db.config.js` files with your desired settings.

#### How to Change Site Title/Byline

Edit the `client/app.settings.ts` file to change any desired display or site information.

#### How to Change the Fonts

Go to [fonts.google.com](https://fonts.google.com) and select two fonts, one for headers and one for body text. Once you have selected two styles, look under the "Use on the Web" pane in the bottom right. Click the `@import` option and copy the code BETWEEN the two `<style>` tags (but don't copy the style tags themselves). Then, go to `client/styles.scss` and REPLACE line 9 with the new statement (just below where it says 'import google fonts').

Then, on lines 19, 20, and 21 of `client/styles.scss`, replate the names of the header/body fonts with your new fonts. That almost does it, but there is one last file to change. Edit `client/app.settings.ts` and change the `bodyFont` and `titleFont` properties to match your new fonts.

#### How to Change Starting Data

If you want to start a project from scratch, simply leave off the last line when performing the sequelize operations during setup. That is, do NOT run the `sequelize db:seed:all` line. This will leave you with a blank project. If you want to use alternative starting data, or data you previously exported from a different installation, simply replace the JSON files in the `server/seeders/import` folder with your desired new data.

#### How to Change the Landing Page

Unfortunately, the landing page does take a little knowledge of Angular to edit. But, you might be able to figure your way around the templates. The files are all located in the `client/components/home` folder and its subdirectories.
