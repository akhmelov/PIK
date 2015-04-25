package com.springapp.mvc.controllers;

import com.springapp.mvc.App;
import com.springapp.mvc.database.DataSource;
import com.springapp.mvc.forms.SingInForm;
import com.springapp.mvc.grains.Basket;
import com.springapp.mvc.grains.Record;
import com.springapp.mvc.model.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * Created by PK on 4/8/2015.
 */
@Controller
@RequestMapping(App.TIN_CONTROLLER_URL)
public class TinController
{
    @Autowired
    private Model model;
    @Autowired
    private DataSource database;

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView home(ModelMap modelMap)
    {
        ModelAndView modelAndView = new ModelAndView(App.HOME);
        modelAndView.addObject("singInForm", new SingInForm());
        return modelAndView;
    }

    @RequestMapping(value = App.HOME, method = RequestMethod.POST)
    public String homePost(@ModelAttribute("SpringWeb") SingInForm singInForm)
    {   //TODO
        ModelAndView modelAndView = new ModelAndView();
        switch (singInForm.getWho())
        {
            case Promoter:
                return "redirect:" + App.BASKETS;
            case Admin:
                return "redirect:" + App.ADMIN;
            default:
                return "redirect:" + App.BASKETS;
        }
    }

    @RequestMapping(value = App.BASKETS, method = RequestMethod.GET)
    public ModelAndView basketsPage()
    {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName(App.BASKETS);
        modelAndView.addObject("baskets", database.getBaskets(1));
        return  modelAndView;
    }

    @RequestMapping(value = App.BASKET)
    public ModelAndView homeTin(HttpServletRequest request)
    {
        String idBasket = request.getParameter(App.ID_EXIST_BASKET_PARAMETER);
        int id = Integer.valueOf(idBasket);

        ModelAndView modelAndView = new ModelAndView(App.BASKET);
        modelAndView.addObject("idBasket", id);
        return modelAndView;
    }

    @RequestMapping(value = App.BASKETS, method = RequestMethod.POST)
    public String addNewBasket(HttpServletRequest request)
    {
        String basketName = request.getParameter(App.NAME_NEW_BASKET_PARAMETER);
        database.addBasket(1, basketName);
        return "redirect:" + App.BASKETS;
    }

    @RequestMapping(value = App.DELETE_BASKET, method = RequestMethod.POST)
    public String deleteBasket(HttpServletRequest request)
    {
        String idBasket = request.getParameter(App.ID_EXIST_BASKET_PARAMETER);
        int id = Integer.valueOf(idBasket);
        database.deleteBasket(1, id);
        return "redirect:" + App.BASKETS;
    }

    @RequestMapping(value = App.EDIT_BASKET, method = RequestMethod.POST)
    public String editBasket(HttpServletRequest request)
    {
        String idBasket = request.getParameter(App.ID_EXIST_BASKET_PARAMETER);
        String newBasketName = request.getParameter(App.NAME_NEW_BASKET_PARAMETER);
        int id = Integer.valueOf(idBasket);
        database.deleteBasket(1, id);
        return "redirect:" + App.BASKETS;
    }

    @RequestMapping(value = App.GET_RECORDS_JSON, method = RequestMethod.POST)
    public @ResponseBody List<Record> getRecords(@RequestParam(value = "" + App.ID_EXIST_BASKET_PARAMETER) Integer idBasket)
    {
        List<Record> tmp = new LinkedList<Record>(database.getRecordsByBasket(1, idBasket).values());
        return tmp;
    }

    @RequestMapping(value = App.SAVE_RECORDS, method = RequestMethod.POST)
    public ModelAndView saveRecords(@RequestBody LinkedList<Record> records)
    {
        //TODO
        Map<Integer, Record> map = new HashMap<Integer, Record>();
        for (Record i : records) map.put(i.getId(), i);
        database.saveRecordsByBasket(1, 1, map);
        ModelAndView modelAndView = new ModelAndView("basket");
        return modelAndView;
    }

    @RequestMapping(value = App.ADD_RECORD, method = RequestMethod.POST)
    public @ResponseBody Integer deleteRecord(@RequestParam(value = "" + App.ID_EXIST_BASKET_PARAMETER) Integer idBasket)
    {
        Record record = new Record();
        return database.addNewRecord(1, idBasket, record);
    }

    @RequestMapping(value = App.GET_RECORD, method = RequestMethod.POST)
    public @ResponseBody Record getRecords(@RequestParam(value = "" + App.ID_EXIST_BASKET_PARAMETER) Integer idBasket,
                                                 @RequestParam(value = "" + App.ID_EXIST_RECORD_PARAMETER) Integer idRecord)
    {
        Record record = database.getRecord(1, idBasket, idRecord);
        record.setNameStudent("" + idRecord); //TODO delete this line, set database
        record.setSurnameStudent("" + idBasket); //TODO delete this line, set database
        return record;
    }

    @RequestMapping(value = App.DELETE_RECORD, method = RequestMethod.POST)
    public @ResponseBody Boolean deleteRecord(HttpServletRequest request)
    {
        int idBasket = Integer.valueOf(request.getParameter(App.ID_EXIST_BASKET_PARAMETER));
        int idRecord = Integer.valueOf(request.getParameter(App.ID_EXIST_RECORD_PARAMETER));
        if(database.deleteRecord(1, idBasket, idRecord))
            return new Boolean(true);
        return new Boolean(false);
    }

    @RequestMapping(value = App.SAVE_RECORD, method = RequestMethod.POST)
    public @ResponseBody Boolean saveRecord(@RequestParam(value = "" + App.ID_EXIST_BASKET_PARAMETER) Integer idBasket,
                                                @RequestBody Record record)
    {
        //TODO
        if(database.saveRecord(1, 1, record.getId(), record))
            return new Boolean(true);
        return new Boolean(false);
    }

    @RequestMapping(value = "/generateXML", method = RequestMethod.POST, consumes = "application/json")
    public @ResponseBody String generateXML()
    {
        //TODO
        String ret = "Hello";
        return ret;
    }
}
