package com.example.wishlist1;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;


public class WishlistAdapter extends BaseAdapter {
	private final Context mContext;
	private final JSONArray mItems;
	
	public WishlistAdapter(Context context, JSONArray items) {
	    mContext = context;
	    mItems = items;
	  }

	@Override
	public int getCount() {
		return mItems.length();
	}

	@Override
	public Object getItem(int i) {
		try {
			return mItems.get(i);
		} catch (JSONException e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public long getItemId(int arg0) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
	    LayoutInflater inflater = (LayoutInflater) mContext
	            .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
	    View rowView = inflater.inflate(R.layout.wishrowlayout, parent, false);
	    TextView textView = (TextView) rowView.findViewById(R.id.label);
	    //ImageView imageView = (ImageView) rowView.findViewById(R.id.icon);
	    try {
			textView.setText(mItems.getString(position));
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			textView.setText("Error.");
		}
	    return rowView;
	}

}