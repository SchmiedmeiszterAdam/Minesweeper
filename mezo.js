class Mezo {
    constructor(elem, index) {
        this.elem = elem
        this.index = index
        this.akna = false
        this.aknaKozelben = false
        this.aktiv = false
        this.elem.on("click", () => {
            this.aktiv = true
            this.elem.unbind()
            let esemeny = new CustomEvent("mezoreKattintas", { detail: this })
            window.dispatchEvent(esemeny)
        })
    }
    aknaMutatas(){
        $(this.elem).css("background-color","red")
    }
    szamBeiras(szam){
        $(this.elem).css("background-color", "gray")
        $(this.elem).html(szam)
    }
}