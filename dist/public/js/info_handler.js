function set_charge_point(){
    const charge_point_list = document.getElementById('charge_point_list').querySelectorAll('tr');
    charge_point_list.forEach ( element=>{
        element = element.querySelectorAll('td');
        charge_point[element[2].innerHTML.trim()] = new Charge_point(element[0],
                                                    element[1],
                                                    element[2],
                                                    element[3],
                                                    element[4],
                                                    element[5],
                                                    element[6],
                                                    element[7]);
    })
}
