
// Collapse
$(document).ready(function () {
    $(".collapse.services-section__collapse").on("click", function () {
        $('.collapse.services-section__collapse').removeClass("active");
        $(this).toggleClass("active");
    });
    $(".collapse.contacts-section__collapse").on("click", function () {
        $('.collapse.contacts-section__collapse').removeClass("active");
        $(this).toggleClass("active");
    });
})

// Checkbox
$(document).ready(function () {
    $(".prices-section__checkbox-input input").on("change", function () {
        console.log('changed');
        console.log(this);
        console.log(this.checked);
        console.log($(this).parent);
        if (this.checked) {
            $(this).parent().children('span').text('Да')
        } else {
            $(this).parent().children('span').text('Нет')
        }
    })
})

// Sections Logic
const sectionsClasses = [
    "main-section",
    "advantages-section",
    "services-section",
    "prices-section",
    "contacts-section"
].reverse()

function setPositions() {
    let space = 0

    for (const sectionClass of sectionsClasses) {
        const section = $(`.${sectionClass}`)

        section.css("right", space + "px")

        if (section.hasClass('active')) {
            space += Number(section.css('width').replace('px', '')) - 40
        } else {
            space += 40 + section.find('.section__header div').width()
        }
    }
}

function setActiveSection(element) {
    let mql = window.matchMedia("(min-width: 900px)");

    const item = $(element)
    console.log(item);

    if (!mql.matches || !item || item.hasClass('active')) {
        return
    }

    $('.section').removeClass('active')
    item.addClass('active')

    setPositions()
}

function setWidth() {
    const spacings = {}

    for (const index in sectionsClasses) {
        const sectionClass = sectionsClasses[index];
        const section = $(`.${sectionClass}`)

        spacings[sectionClass] = 40 + section.find('.section__header div').width()
    }

    for (const sectionClass of sectionsClasses) {
        const space = Object.keys(spacings).reduce((total, current) => {
            if (current === sectionClass) {
                return total
            }

            return total + spacings[current]
        }, 0)

        $(`.${sectionClass}`).css('width', $(document).width() - space + 40 + 'px')
    }

}

$(document).ready(function () {
    let mql = window.matchMedia("(min-width: 900px)");

    $('.section').click(function () {
        setActiveSection(this)
    })

    $('.main-section__button').click(function (e) {
        let mql = window.matchMedia("(min-width: 900px)");
        if (!mql.matches) {
            return
        }
        e.stopPropagation()
        e.preventDefault()
        setActiveSection('.prices-section')
    })

    if (!mql.matches) {
        return
    }

    setWidth()
    setPositions()
})

window.addEventListener('resize', function () {
    let mql = window.matchMedia("(min-width: 900px)");

    if (mql.matches) {
        setWidth()
        setPositions()
    } else {
        $('.section').css('width', '100%')
        $('.section').css('right', 'auto')
    }
})