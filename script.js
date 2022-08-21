$(function () {
    const mezok = []
    const mezoSablon = $("<div class = 'mezo'></div>")
    const palya = $("#palya")
    let sorHossz = 37
    let oszlopHossz = 19
    const aknak = []
    const mezoMennyiseg = sorHossz * oszlopHossz
    let aknaSzam = mezoMennyiseg / 6
    $(palya).css("grid-template-columns", "repeat(" + sorHossz + ",1fr)")
    $(palya).css("grid-template-rows", "repeat(" + oszlopHossz + ",1fr)")

    mezokLetrehozasa()
    aknakElhelyezese()
    function mezokLetrehozasa() {
        for (let i = 0; i < mezoMennyiseg; i++) {
            let elem = $(mezoSablon).clone().appendTo(palya)
            mezok.push(new Mezo(elem, i))
        }
    }
    function aknakElhelyezese() {
        let aknaHely
        for (let i = 0; i < aknaSzam; i++) {
            aknaHely = Math.floor(Math.random() * mezoMennyiseg)
            while (aknak.includes(aknaHely)) {
                aknaHely = Math.floor(Math.random() * mezoMennyiseg)
            }
            aknak.push(aknaHely)
            mezok[aknaHely].akna = true
           // mezok[aknaHely].aknaMutatas()
        }
    }
    $(window).on("mezoreKattintas", (event) => {
        const mezo = event.detail
        const mezoIndex = mezo.index
        ellenorzes(mezoIndex)
    })
    function aknaSzamSomszedokban(i) {
        let aknakSzama = 0
        if (i > sorHossz - 1) {
            if (i % sorHossz != 0 && aknakE((i - 1 - sorHossz))) {
                aknakSzama++
            }
            if (mezok[i - sorHossz].akna) {
                aknakSzama++
            }
        }
        if (i < mezoMennyiseg - sorHossz - 1) {
            if (i % sorHossz != sorHossz - 1 && aknakE((i + 1 + sorHossz))) {
                aknakSzama++
            }
            if (mezok[i + sorHossz].akna) {
                aknakSzama++
            }
        }
        if (i % sorHossz != 0) {
            if (i < mezoMennyiseg - sorHossz - 1 && aknakE((i - 1 + sorHossz))) {
                aknakSzama++
            }
            if (mezok[i - 1].akna) {
                aknakSzama++
            }
        }
        if (i % sorHossz != sorHossz - 1) {
            if (i > sorHossz - 1 && aknakE((i + 1 - sorHossz))) {
                aknakSzama++
            }
            if (mezok[i + 1].akna) {
                aknakSzama++
            }
        }
        function aknakE(i) {
            return mezok[i].akna
        }
        return aknakSzama
    }
    function ellenorzes(i) {
        let szomszedok = mezoSzomszedjai(i)
        let aknakSzama = aknaSzamSomszedokban(i)
        if (mezok[i].akna) {
            console.log("BUMM")
        }
        else if (aknakSzama == 0) {
            uresEllenorzes(szomszedok)
        }
        else {
            mezok[i].szamBeiras(aknaSzamSomszedokban(i))
        }
    }
    function nemBalSzelsoElem(i) {
        return i % sorHossz != 0
    }
    function nemJobbSzelsoElem(i) {
        return i % sorHossz != sorHossz - 1
    }
    function nemFelsoElem(i) {
        return i > sorHossz - 1
    }
    function nemAlsoElem(i) {
        return i < mezoMennyiseg - sorHossz - 1
    }
    function balFelsoSzomszedVan(i) {
        return (nemFelsoElem(i) && nemBalSzelsoElem(i))
    }
    function balAlsoSzomszedVan(i) {
        return (nemAlsoElem(i) && nemBalSzelsoElem(i))
    }
    function jobbAlsoSzomszedVan(i) {
        return (nemJobbSzelsoElem(i) && nemAlsoElem(i))
    }
    function jobbFelsoSzomszedVan(i) {
        return (nemJobbSzelsoElem(i) && nemFelsoElem(i))
    }
    function mezoSzomszedjai(i) {
        const szomszedok = []
        if (nemFelsoElem(i)) {
            szomszedok.push(i - sorHossz)
        }
        if (nemAlsoElem(i)) {
            szomszedok.push(i + sorHossz)
        }
        if (nemBalSzelsoElem(i)) {
            szomszedok.push(i - 1)
        }
        if (nemJobbSzelsoElem(i)) {
            szomszedok.push(i + 1)
        }
        if (balAlsoSzomszedVan(i)) {
            szomszedok.push(i - 1 + sorHossz)
        }
        if (jobbAlsoSzomszedVan(i)) {
            szomszedok.push(i + 1 + sorHossz)
        }
        if (balFelsoSzomszedVan(i)) {
            szomszedok.push(i - 1 - sorHossz)
        }
        if (jobbFelsoSzomszedVan(i)) {
            szomszedok.push(i + 1 - sorHossz)
        }
        return szomszedok
    }
    function uresEllenorzes(szomszedoMezoIndexek) {
        szomszedoMezoIndexek.forEach(element => {
            $(mezok[element].elem).css("background-color", "gray")
            mezok[element].elem.click()
        });
    }
})