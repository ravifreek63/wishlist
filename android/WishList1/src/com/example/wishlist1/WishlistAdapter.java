package com.example.wishlist1;
import java.io.IOException;
import java.io.InputStream;
import java.lang.ref.WeakReference;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;



public class WishlistAdapter extends BaseAdapter {
	private final Context mContext;
	private final JSONArray mItems;
	private final String mUserId;
	private final Activity mActivity;
	private final Bitmap mTestBitmap;
	
	public WishlistAdapter(Context context, JSONArray items, String userId, Activity activity) {
	    mContext = context;
	    mItems = items;
	    mUserId = userId;
	    mActivity = activity;
	    mTestBitmap = BitmapFactory.decodeResource(mActivity.getResources(),R.drawable.ic_launcher);
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
		System.out.println("In getView:");
		LayoutInflater inflater = (LayoutInflater) mContext
	            .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
	    View rowView = inflater.inflate(R.layout.wishrowlayout, parent, false);
	    TextView textViewLabel = (TextView) rowView.findViewById(R.id.label);
	    TextView textViewDescr = (TextView) rowView.findViewById(R.id.descr);
	    ImageView imageView = (ImageView) rowView.findViewById(R.id.icon);	       	    
	    

	    try {
	    	JSONObject jsonObject = new JSONObject(mItems.getString(position));	    	
	    	String itemName = jsonObject.getString("ItemName");
	    	String itemDescription = jsonObject.getString("Description");	    	
	    	String itemImageName = jsonObject.getString("ImageName");	    	
			textViewLabel.setText(itemName);
			textViewDescr.setText(itemDescription);
		    ImageView img = (ImageView) imageView;
		    BitmapWorkerTask task = new BitmapWorkerTask(img);		    		    		   		    
		    task.execute("http://ec2-54-186-87-220.us-west-2.compute.amazonaws.com:3000/uploads/"+ itemImageName);		    
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			textViewLabel.setText("Error.");
		}
	    return rowView;
	}

	public class PopulateImageParameters {
		public String imageId;
		public ImageView imageView;
		public PopulateImageParameters(String _imageId, ImageView _imageView) {
			imageId = _imageId;
			imageView = _imageView;
		}
	}
	
	private class ImageRequestPost extends HttpPost.SendableObject {
		public ImageRequestPost(String imageId){
			url = "http://ec2-54-186-87-220.us-west-2.compute.amazonaws.com:3000/user/" + mUserId +"/"+imageId+"/getImage";
			httpType = HttpType.GET;
		}
		public String toJSON() {
			return "{}";
		}
	}
	
	private class BitmapWorkerTask extends AsyncTask<String, Void, Bitmap> {
	    private final WeakReference<ImageView> imageViewReference;
	    private String data;

	    public BitmapWorkerTask(ImageView imageView) {
	        // Use a WeakReference to ensure the ImageView can be garbage
	        // collected
	        imageViewReference = new WeakReference<ImageView>(imageView);
	    }

	    // Decode image in background.
	    @Override
	    protected Bitmap doInBackground(String... params) {
	        data = params[0];
	        try {
	            return BitmapFactory.decodeStream((InputStream) new URL(data)
	                    .getContent());
	        } catch (MalformedURLException e) {
	            e.printStackTrace();
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        return null;
	    }

	    // Once complete, see if ImageView is still around and set bitmap.
	    @Override
	    protected void onPostExecute(Bitmap bitmap) {
	        if (imageViewReference != null && bitmap != null) {
	            final ImageView imageView = imageViewReference.get();
	            if (imageView != null) {
	                imageView.setImageBitmap(bitmap);
	                imageView.setVisibility(View.VISIBLE);
	            }
	        }
	    }
	}
	
	//This method obtained from http://stackoverflow.com/questions/15549421/how-to-download-and-save-an-image-in-android
	public static Bitmap getBitmapFromURL(String link) {
	    /*--- this method downloads an Image from the given URL, 
	     *  then decodes and returns a Bitmap object
	     ---*/
	    try {
	        URL url = new URL(link);
	        HttpURLConnection connection = (HttpURLConnection) url
	                .openConnection();
	        connection.setDoInput(true);
	        connection.connect();
	        InputStream input = connection.getInputStream();
	        Bitmap myBitmap = BitmapFactory.decodeStream(input);
	        
	        //Log.d("tatewty","bitmap height: "+myBitmap.getHeight());
	        if (myBitmap==null) {
	        	Log.d("tatewty","bitmap is null");
	        }
	        
	        Log.d("tatewty","Image download success!");
	        
	        return myBitmap;

	    } catch (IOException e) {
	        e.printStackTrace();
	        Log.e("tatewty", "Failed to download image: " + e.getMessage().toString());
	        return null;
	    }
	}
	
	public class PopulateImageViewTask extends AsyncTask<PopulateImageParameters,Void,Void> {
		@Override
		protected Void doInBackground(PopulateImageParameters... paramss) {
			PopulateImageParameters params = paramss[0];
			String imageId = params.imageId;
			final ImageView imageView = params.imageView;
			String link = "http://ec2-54-186-87-220.us-west-2.compute.amazonaws.com:3000/user/" + mUserId +"/"+imageId+"/getImage";
			final Bitmap image = getBitmapFromURL(link);
			mActivity.runOnUiThread(new Runnable() {
			     @Override
			     public void run() {
						imageView.setImageBitmap(image);
						imageView.setVisibility(View.VISIBLE);
			    }
			});
			return null;
		}
	}
	
	
	
}
